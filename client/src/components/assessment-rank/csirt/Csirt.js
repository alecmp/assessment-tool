import {
  makeStyles,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { editService } from '../../../actions/assessment';
import * as csirtService from '../../../services/csirtService';
import ConfirmDialog from '../../layout/ConfirmDialog';
import Notification from '../../layout/Notification';
import PageHeader from '../../layout/PageHeader';
import Popup from '../../layout/Popup';
import useTable from '../../layout/useTable';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}));

const headCells = [
  { id: 'serviceArea', label: 'Service Area' },
  { id: 'service', label: 'Service' },
  { id: 'value', label: 'Value' }
];

const Csirt = ({ records, editService, isReadOnlyMode }) => {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: ''
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: ''
  });

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, headCells, filterFn);

  const [value, setValue] = useState();

  const handleChange = (item, e) => {
    item.value = e.target.value;
    setValue({ ...value, [e.target.id]: e.target.value });
    editService(item);
  };

  return (
    <>
      <PageHeader
        title="Computer Security Incident Response Team"
        subTitle="Fill out the questionnaire relating to CSIRT compliant services. 5 will be assigned to a perfectly implemented service."
        icon={<BuildOutlinedIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Table>
          <TblHead />
          <TableBody>
            {csirtService.getServiceAreaCollection().map((item) => (
              <Fragment>
                <TableRow>
                  <TableCell
                    rowSpan={
                      csirtService.getServicesNumberByServiceArea(item.id) + 1
                    }
                  >
                    {csirtService.getServiceAreaLabel(item.id)}
                  </TableCell>
                </TableRow>
                {records
                  .filter((rec) => rec.serviceArea === item.id)
                  .map((childItem) => (
                    <TableRow>
                      <TableCell>
                        {csirtService.getServiceLabel(childItem.id)}
                      </TableCell>
                      <TableCell>
                        <Select
                          disabled={isReadOnlyMode}
                          value={childItem.value}
                          onChange={(e) => handleChange(childItem, e)}
                        ><MenuItem value={0}>0</MenuItem>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Popup
        title="Employee Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      ></Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

Csirt.propTypes = {
  records: PropTypes.array.isRequired,
  editService: PropTypes.func.isRequired,
  isReadOnlyMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    records: state.assessment.assessment.csirt,
    isReadOnlyMode: state.assessment.isReadOnlyMode
  };
};

export default connect(mapStateToProps, {
  editService
})(Csirt);
