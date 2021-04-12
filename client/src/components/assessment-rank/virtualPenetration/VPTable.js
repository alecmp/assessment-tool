import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as virtualPenetrationService from '../../../services/virtualPenetrationService';
import useTable from '../../layout/useTable';

const useStyles = makeStyles({
  table: {
    width: '100%'
  }
});

const headCells = [
  { id: 'attackType', label: 'Attack Type' },
  { id: 'total', label: 'Total' },
  { id: 'saferank', label: 'Safe Rank' },
  { id: 'daterank', label: 'Date Rank' },
  { id: 'assessment', label: 'Assessment' }
];

const VPTable = (virtualpenetration) => {
  const classes = useStyles();
  const records = virtualpenetration;

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

  return (
    <Table className={classes.table} size="small" aria-label="simple table">
      <TblHead />
      <TableBody>
        {virtualPenetrationService
          .getGroupedRecords(virtualpenetration.virtualpenetration)
          .map((attack) => (
            <TableRow key={attack.id}>
              <TableCell align="left">
                {virtualPenetrationService.getAttackTypeFromId(attack.id)}
              </TableCell>
              <TableCell align="left">{attack.occ}</TableCell>
              <TableCell align="left">{attack.severity}</TableCell>
              <TableCell align="left">{attack.dataRank}</TableCell>
              <TableCell align="left">{attack.assessment / 5}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

VPTable.propTypes = {
  virtualpenetration: PropTypes.array.isRequired
};

export default VPTable;
