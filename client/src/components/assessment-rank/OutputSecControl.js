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
import { IDEAL_VALUE, getAttackCollection, getMatches, getRealValues, getRealValuesOfArea } from '../../services/outputService';
import * as secControlService from '../../services/secControlService';
import { secControlAttackImpacts } from '../../services/attackImpactMatrix';
import { addAttackSum } from '../../actions/assessment'
import Controls from '../controls/Controls';
import PageHeader from '../layout/PageHeader';
import Popup from '../layout/Popup';
import useTable from '../layout/useTable';


const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    overflowX: 'auto'
  },

  table: {
    tableLayout: 'auto'
  }
}));

const headCells = [
  { id: '0', label: 'Security control' },
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

const OutputSecControl = ({ records, customerprofile, currentResults, addAttackSum }) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

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
      case 5:
        return 'primary';
      case 0:
        return 'secondary';
      default:
        return 'default';
    }
  };

  const renderSecControlCells = (item) => {
    const cells = [];
    for (var i = 0; i < getAttackCollection().length; i++) {
      cells.push(
        <TableCell>
          {item.attackValues[i]}
        </TableCell>
      );
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

  /*  const incrementAttackValueSum = (items) => {
     for (var i = 0; i < currentResults.length; i++) {
       currentResults[i].value = currentResults[i].value + items[i];
     }
     addAttackSum(currentResults)
   };
  */

  return (
    <>
      <PageHeader
        title="Output security control"
        subTitle="Form design with validation"
        icon={<CheckOutlinedIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TblHead />

          <TableBody>
            {getMatches(records).map((item) => (
              <TableRow key={item.id}>
                <TableCell font="th">
                  {secControlService.getSecurityControlLabel(item.id)}
                </TableCell>
                {renderSecControlCells(item)}
              </TableRow>
            ))}

            <TableRow key="realvalue">
              <TableCell font="th">Real value</TableCell>
              {
                getRealValues(
                  getMatches(records),
                  secControlAttackImpacts
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
                  getMatches(records),
                  secControlAttackImpacts,
                  customerprofile.attacks,
                  customerprofile.riskOfArea
                )
                  .map((item) => (
                    <TableCell font="th">
                      <Chip
                        size="small"
                        label={item}
                        color={item === IDEAL_VALUE ? 'primary' : 'secondary'}
                      />
                    </TableCell>
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

OutputSecControl.propTypes = {
  records: PropTypes.array.isRequired,
  currentResults: PropTypes.array.isRequired,
  addAttackSum: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    records: state.assessment.assessment.securitycontrol,
    customerprofile: state.assessment.assessment.customerprofile,
    currentResults: state.assessment.assessment.results
  };
};

export default connect(mapStateToProps, { addAttackSum })(OutputSecControl);