import {
  Card,
  CardHeader,
  Divider, Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow, Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAssessment, getAssessment } from '../../actions/assessment';
import formatDate from '../../utils/formatDate';
import Controls from '../controls/Controls';
import ConfirmDialog from '../layout/ConfirmDialog';
import Notification from '../layout/Notification';
import useTable from '../layout/useTable';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    padding: theme.spacing(3)
  }
}));

const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'customer', label: 'Customer' },
  { id: 'date', label: 'Date' },
  { id: 'actions', label: 'Actions', disableSorting: true }
];

const Assessments = ({ assessments, getAssessment, deleteAssessment }) => {
  const classes = useStyles();
  const records = assessments;
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });
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

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    deleteAssessment(id);
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'success'
    });
  };

  return (
    <>
      {Object.keys(assessments).length === 0 ? (
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
                There aren't any assessments yet. Start a new one.
              </Typography>
            </Grid>
          </Grid>
        </div>
      ) : (
        <>
          <Card className={classes.pageContent}>
            <CardHeader title="Latest assessments" titleTypographyProps={{ variant: 'h6' }} />
            <Divider />
            <Table className={classes.table} size="small">
              <TblHead />
              <TableBody>
                {assessments.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>
                      {item.customerprofile.company}
                    </TableCell>
                    <TableCell>{formatDate(item.date)}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => getAssessment(item._id)}
                        component={Link}
                        to={`/assessments/${item._id}`}
                      >
                        <VisibilityOutlinedIcon fontSize="small" />
                      </Button>
                      <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Are you sure to delete this record?',
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              onDelete(item._id);
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
          </Card>
        </>
      )}

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

Assessments.propTypes = {
  assessments: PropTypes.array.isRequired,
  deleteAssessment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    assessments: state.assessment.assessments
  };
};

export default connect(null, { getAssessment, deleteAssessment })(Assessments);
