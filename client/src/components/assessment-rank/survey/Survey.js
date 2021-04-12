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
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editSecurityMeasure } from '../../../actions/assessment';
import * as surveyService from '../../../services/surveyService';
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
  { id: 'secMeasures', label: 'Security Measures' },
  { id: 'value', label: 'Value' }
];

const Survey = ({ records, editSecurityMeasure, isReadOnlyMode }) => {
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

  const [value, setValue] = useState();

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, headCells, filterFn);

  const handleChange = (item, e) => {
    item.value = e.target.value;

    setValue({ ...value, [e.target.id]: e.target.value });
    editSecurityMeasure(item);
  };

  return (
    <>
      <PageHeader
        title="Survey"
        subTitle="Fill the questionnaire about the client's vulnerability level in accordance with the 20 critical security controls described by SANS"
        icon={<AssignmentOutlinedIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Table>
          <TblHead />
          <TableBody>
            {records.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {surveyService.getSecurityMeasureLabel(item.id)}
                </TableCell>
                <TableCell>
                  <Select
                    disabled={isReadOnlyMode}
                    value={item.value}
                    onChange={(e) => handleChange(item, e)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
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

Survey.propTypes = {
  records: PropTypes.array.isRequired,
  editSecurityMeasure: PropTypes.func.isRequired,
  isReadOnlyMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    records: state.assessment.assessment.survey,
    isReadOnlyMode: state.assessment.isReadOnlyMode
  };
};

export default connect(mapStateToProps, {
  editSecurityMeasure
})(Survey);
