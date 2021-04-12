import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editControl } from '../../../actions/assessment';
import * as secControlService from '../../../services/secControlService';
import PageHeader from '../../layout/PageHeader';
import Popup from '../../layout/Popup';
import useTable from '../../layout/useTable';
import ControlForm from './ControlForm';


const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}));

export const NONE_CONTROL = 1;
export const YES_CONTROL = 2;
export const NO_CONTROL = 3;

const headCells = [
  { id: 'secControl', label: 'Security Control' },
  { id: 'upguard', label: 'UpGuard' },
  { id: 'sucuri', label: 'Sucuri' },
  { id: 'edit', label: 'Edit', disableSorting: true }
];

const SecControl = ({ records, editControl, isReadOnlyMode }) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, headCells, filterFn);

  const edit = (item) => {
    editControl(item);
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const handleClickOpen = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const getControlOutputColor = (item) => {
    switch (item) {
      case YES_CONTROL:
        return 'primary';
      case NO_CONTROL:
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getControlOutputName = (item) => {
    switch (item) {
      case NONE_CONTROL:
        return 'None';
      case YES_CONTROL:
        return 'Yes';
      case NO_CONTROL:
        return 'No';
      default:
        return 'None';
    }
  };

  return (
    <>
      <PageHeader
        title="Automatic check on security controls"
        subTitle="Use this section to check wether new security controls have been discovered using Upguard or Sucury tools"
        icon={<CheckOutlinedIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TblHead />
          <TableBody>
            {records.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {secControlService.getSecurityControlLabel(item.id)}
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={getControlOutputName(item.upguard)}
                    color={getControlOutputColor(item.upguard)}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={getControlOutputName(item.sucuri)}
                    color={getControlOutputColor(item.sucuri)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    disabled={isReadOnlyMode}
                    color="primary"
                    onClick={() => {
                      handleClickOpen(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Popup
        title="Edit control"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ControlForm recordForEdit={recordForEdit} edit={edit}></ControlForm>
      </Popup>
    </>
  );
};

SecControl.propTypes = {
  records: PropTypes.array.isRequired,
  isReadOnlyMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    records: state.assessment.assessment.securitycontrol,
    isReadOnlyMode: state.assessment.isReadOnlyMode
  };
};

export default connect(mapStateToProps, { editControl })(SecControl);
