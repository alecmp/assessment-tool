import {
  InputAdornment,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Toolbar
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addAttack,
  deleteAttack,
  editAttack
} from '../../../actions/assessment';
import * as virtualPenetrationService from '../../../services/virtualPenetrationService';
import Controls from '../../controls/Controls';
import ConfirmDialog from '../../layout/ConfirmDialog';
import Notification from '../../layout/Notification';
import PageHeader from '../../layout/PageHeader';
import Popup from '../../layout/Popup';
import useTable from '../../layout/useTable';
import AttackForm from './AttackForm';
import BarChart from './BarChart';
import VPTable from './VPTable';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  root: {
    flexGrow: 1
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  }
}));

const headCells = [
  { id: 'yearOfAttack', label: 'Year of Attack' },
  { id: 'attackType', label: 'Attack Type' },
  { id: 'severity', label: 'Severity' },
  { id: 'dataRank', label: 'Data Rank' },
  { id: 'actions', label: 'Actions', disableSorting: true }
];

const VirtualPenetration = ({
  virtualpenetration,
  addAttack,
  editAttack,
  deleteAttack,
  isReadOnlyMode
}) => {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const records = virtualpenetration;
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

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items;
        else
          return items.filter((x) =>
            virtualPenetrationService
              .getAttackTypeFromId(x.attackTypeId)
              .toLowerCase()
              .includes(target.value)
          );
      }
    });
  };

  const addOrEdit = (attack, resetForm) => {
    if (recordForEdit == null) addAttack(attack);
    else editAttack(attack);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success'
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    deleteAttack(id);
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'success'
    });
  };

  const renderVPTableAndChart = () => {
    if (virtualpenetration.length > 0) {
      return (
        <>
          <Paper className={classes.pageContent}>
            <VPTable virtualpenetration={virtualpenetration}></VPTable>
          </Paper>
          <Paper className={classes.pageContent}>
            <BarChart virtualpenetration={virtualpenetration}></BarChart>
          </Paper>
        </>
      );
    }
  };

  return (
    <>
      <PageHeader
        title="Virtual penetration"
        subTitle="An analysis of the attacks received in the past by the customer is carried on in order to evaluate any more relevant threats"
        icon={<BarChartOutlinedIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search attack type"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            disabled={isReadOnlyMode}
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <Table>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((att) => (
              <TableRow key={att.id}>
                <TableCell>
                  {att.yearOfAttack}
                </TableCell>
                <TableCell>
                  {virtualPenetrationService.getAttackTypeFromId(
                    att.attackTypeId
                  )}
                </TableCell>
                <TableCell>{att.severity}</TableCell>
                <TableCell>{att.dataRank}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(att);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDelete(att.id);
                        }
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TblPagination />
      </Paper>

      {renderVPTableAndChart()}

      <Popup
        title="New attack"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AttackForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};
VirtualPenetration.propTypes = {
  virtualpenetration: PropTypes.array.isRequired,
  editAttack: PropTypes.func.isRequired,
  addAttack: PropTypes.func.isRequired,
  deleteAttack: PropTypes.func.isRequired,
  isReadOnlyMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    virtualpenetration: state.assessment.assessment.virtualpenetration,
    isReadOnlyMode: state.assessment.isReadOnlyMode
  };
};

export default connect(mapStateToProps, {
  addAttack,
  editAttack,
  deleteAttack
})(VirtualPenetration);