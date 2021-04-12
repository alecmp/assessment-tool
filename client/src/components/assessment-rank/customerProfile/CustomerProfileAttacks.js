import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useTable from '../../layout/useTable';
import * as customerProfileService from '../../../services/customerProfileService';

const useStyles = makeStyles({
  table: {
    width: '100%'
  }
});

const headCells = [{ id: 'attack', label: 'Most dangerous attacks' }];

const CPTable = (customerprofile) => {
  const classes = useStyles();
  const records = customerprofile;

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
        {customerProfileService
          .getAttacksBySector(customerprofile.sector)
          .map((attack) => (
            <TableRow key={attack}>
              <TableCell align="left">
                {customerProfileService.getAttackLabel(attack)}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

CPTable.propTypes = {
  customerprofile: PropTypes.array.isRequired
};

export default CPTable;
