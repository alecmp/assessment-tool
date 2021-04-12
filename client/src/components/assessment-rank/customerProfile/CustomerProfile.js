import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addCustomerProfile,
  deleteAttack,
  editCustomerProfile
} from '../../../actions/assessment';
import * as customerProfileService from '../../../services/customerProfileService';
import Controls from '../../controls/Controls';
import ConfirmDialog from '../../layout/ConfirmDialog';
import Notification from '../../layout/Notification';
import PageHeader from '../../layout/PageHeader';
import Popup from '../../layout/Popup';
import useTable from '../../layout/useTable';
import CustomerProfileForm from './CustomerProfileForm';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },

  header: {
    fontSize: 15
  }
}));

const headCells = [
  { id: 'company', label: 'Company' },
  { id: 'country', label: 'Country' },
  { id: 'sector', label: 'Sector' },
  { id: 'riskOfArea', label: 'Risk of area' },
  { id: 'edit', label: 'Edit', disableSorting: true }
];

const CustomerProfile = ({
  customerprofile,
  addCustomerProfile,
  editCustomerProfile,
  isReadOnlyMode
}) => {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const records = customerprofile;
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

  const addOrEdit = (customer, resetForm) => {
    const riskOfArea = customerProfileService.getCLUSIT(customer.country);
    const attacks = customerProfileService
      .getAttacksBySector(customer.sector);
    customer.riskOfArea = riskOfArea;
    customer.attacks = attacks;
    if (recordForEdit == null) addCustomerProfile(customer);
    else editCustomerProfile(customer);
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

  return (
    <>
      <PageHeader
        title="Customer profile"
        subTitle="Enter the basic customer information to evaluate the risk of area and the 10 most likely attacks in the working sector"
        icon={<BarChartOutlinedIcon fontSize="large" />}
      />

      {Object.keys(customerprofile).length === 0 ? (
        <div className={classes.pageContent}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs="auto">
              <Typography
                align="center"
                variant="overline"
                display="block"
                gutterBottom
              >
                Add a new Customer
              </Typography>
            </Grid>
            <Grid item xs="auto">
              <Controls.Button
                text="Add New"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => {
                  setOpenPopup(true);
                  setRecordForEdit(null);
                }}
              />
            </Grid>
          </Grid>
        </div>
      ) : (
        <>
          <Paper className={classes.pageContent}>
            <Table>
              <TblHead />
              <TableBody>
                <TableRow key={customerprofile.id}>
                  <TableCell>{customerprofile.company}</TableCell>
                  <TableCell>
                    {customerProfileService.getCountryFromId(
                      customerprofile.country
                    )}
                  </TableCell>
                  <TableCell>
                    {customerProfileService.getSectorFromId(
                      customerprofile.sector
                    )}
                  </TableCell>
                  <TableCell>
                    {customerProfileService.getCLUSIT(customerprofile.country)}
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={isReadOnlyMode}
                      color="primary"
                      onClick={() => {
                        openInPopup(customerprofile);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {/*  </Paper> */}

            <Grid container>
              <Grid item xs={6}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="simple table"
                >
                  {/* <TableHead align="center" className={classes.header}>
                    Most dangerous attacks
                  </TableHead> */}
                  {/* <TblHead /> */}
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
              </Grid>
            </Grid>
          </Paper>
        </>
      )}

      <Popup
        title="New customer"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CustomerProfileForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};
CustomerProfile.propTypes = {
  customerprofile: PropTypes.array.isRequired,
  addCustomerProfile: PropTypes.func.isRequired,
  editCustomerProfile: PropTypes.func.isRequired,
  isReadOnlyMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  customerprofile: state.assessment.assessment.customerprofile,
  isReadOnlyMode: state.assessment.isReadOnlyMode
});
export default connect(mapStateToProps, {
  addCustomerProfile,
  editCustomerProfile
})(CustomerProfile);
