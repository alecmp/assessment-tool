import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as LinkRouter } from 'react-router-dom';
import { addAssessment, getAssessments } from '../../actions/assessment';
import Assessments from './Assessments';

const Dashboard = ({
  auth: { user, isAuthenticated },
  getAssessments,
  addAssessment,
  assessments
}) => {

  useEffect(() => {
    console.log('isAuthenticated ', isAuthenticated)
    setTimeout(() => {
      getAssessments()
    }, 1000)

  }, [getAssessments]);

  const useStyles = makeStyles((theme) => ({
    body: {
      backgroundColor: '#f4f6f8'
    },
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
    },

    newButton: {
      position: 'absolute',
      right: '10px'
    },
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18
      }
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fragment>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <p className="lead">
          <i className="fas fa-user" /> Welcome, {user && user.firstName}
        </p>

        <div className="dash-buttons">
          <Button
            onClick={() => addAssessment()}
            component={LinkRouter}
            to="/new-assessment"
            variant="contained"
            color="primary"
          >
            New Assessment
          </Button>
        </div>
        <Assessments assessments={assessments} />
      </Fragment>
    </div>
  );
};

Dashboard.propTypes = {
  getAssessments: PropTypes.func.isRequired,
  addAssessment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  assessments: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  assessments: state.assessment.assessments
});

export default connect(mapStateToProps, {
  getAssessments,
  addAssessment
})(Dashboard);
