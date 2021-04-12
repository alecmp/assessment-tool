import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  withStyles
} from '@material-ui/core';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { IDEAL_VALUE, getAttackCollection, getCSIRTMatches, getRealValues, getRealValuesOfArea } from '../../services/outputService';
import * as csirtService from '../../services/csirtService';
import Controls from '../controls/Controls';
import PageHeader from '../layout/PageHeader';
import Popup from '../layout/Popup';
import useTable from '../layout/useTable';
import { CSIRTAttackImpacts } from '../../services/attackImpactMatrix';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    //paddingTop: theme.spacing(0),
    //height: 600,
    overflowX: 'auto'
    //overflowY: 'auto'
  },

  table: {
    tableLayout: 'auto'
  }
}));

const headCells = [
  { id: '0', label: 'Service' },
  { id: '1', label: 'XSS' },
  { id: '2', label: 'Phishing' },
  { id: '3', label: 'Man in the middle' },
  { id: '4', label: 'DNS hijacking' },
  { id: '5', label: 'DoS/DDoS' },
  { id: '6', label: 'XST' },
  { id: '7', label: 'Spam' },
  { id: '8', label: 'Drive-by-download' },
  { id: '9', label: 'Code Injection' },
  { id: '10', label: 'Spearphishing Attachment' },
  { id: '11', label: 'Command-Line Interface' },
  { id: '12', label: 'PowerShell' },
  { id: '13', label: 'Scripting' },
  { id: '14', label: 'Connection Proxy' },
  { id: '15', label: 'Brute Force' },
  { id: '16', label: 'Process Discovery' },
  { id: '17', label: 'Remote File Copy' },
  { id: '18', label: 'User Execution' },
  { id: '19', label: 'Standard Application Layer Protocol' },
  { id: '20', label: 'File and Directory Discovery' },
  { id: '21', label: 'Drive-by Compromise' },
  { id: '22', label: 'Exploitation for Client Execution' },
  { id: '23', label: 'Data Encrypted' },
  { id: '24', label: 'Credential Dumping' },
  { id: '25', label: 'Valid Accounts' },
  { id: '26', label: 'Data Compressed' }
];

const OutputCSIRT = ({ csirt, customerprofile }) => {
  const classes = useStyles();
  const records = csirt;
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

  const getControlOutputColor = (item) => {
    switch (item) {
      case 1:
        return 'primary';
      case 2:
        return 'secondary';
      default:
        return 'default';
    }
  };

  const renderCSIRTlCells = (item) => {
    const cells = [];

    for (var i = 0; i < getAttackCollection().length; i++) {
      // return (
      cells.push(
        <TableCell>
          {item.attackValues[i]}
          {/* <Chip
            size="small"
            label={item.attackValues[i]}
            color={getControlOutputColor(item.attackValues[i])}
          /> */}
        </TableCell>
      );
      //);
    }

    return cells;
  };

  const renderIdealValueCells = () => {
    const cells = [];
    for (var i = 0; i < getAttackCollection().length; i++) {
      cells.push(
        <TableCell>
          <Chip
            size="small"
            label={IDEAL_VALUE}
            color='primary'
          />
        </TableCell>
      );
    }
    return cells;
  };

  return (
    <>
      <PageHeader
        title="Output CSIRT"
        subTitle="Form design with validation"
        icon={<CheckOutlinedIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Table
          /* stickyHeader */
          className={classes.table}
          size="small"
          aria-label="simple table"
        >
          <TblHead />

          <TableBody>
            {getCSIRTMatches(records).map((item) => (
              <TableRow key={item.id}>
                <TableCell font="th">
                  {csirtService.getServiceLabel(item.id)}
                </TableCell>
                {renderCSIRTlCells(item)}
              </TableRow>
            ))}
            <TableRow key="realvalue">
              <TableCell font="th">Real value</TableCell>
              {
                getRealValues(
                  getCSIRTMatches(records),
                  CSIRTAttackImpacts
                )
                  .map((item) => (
                    <TableCell font="th"><Chip
                      size="small"
                      label={item}
                      color={item === IDEAL_VALUE ? 'primary' : 'secondary'}
                    /></TableCell>
                  ))}
            </TableRow>
            <TableRow key="idealvalue">
              <TableCell font="th">Ideal value</TableCell>
              {renderIdealValueCells()}
            </TableRow>
            <TableRow key="realvalueofarea">
              <TableCell font="th">Real value (+ area)</TableCell>
              {
                getRealValuesOfArea(
                  getCSIRTMatches(records),
                  CSIRTAttackImpacts,
                  customerprofile.attacks,
                  customerprofile.riskOfArea
                )
                  .map((item) => (
                    <TableCell font="th"><Chip
                      size="small"
                      label={item}
                      color={item === IDEAL_VALUE ? 'primary' : 'secondary'}
                    /></TableCell>
                  ))}
            </TableRow>
            <TableRow key="idealvalueofarea">
              <TableCell font="th">Ideal value (+ area)</TableCell>
              {renderIdealValueCells()}
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Popup
        title="Edits control"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      ></Popup>
    </>
  );
};

OutputCSIRT.propTypes = {
  csirt: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    csirt: state.assessment.assessment.csirt,
    customerprofile: state.assessment.assessment.customerprofile
  };
};

export default connect(mapStateToProps, {})(OutputCSIRT);