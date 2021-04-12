import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { endAssessment, addAttackSum } from '../../actions/assessment';
import VerticalTabs from '../assessment-rank/TabPanel';
import ResultsChart from '../assessment-rank/ResultsChart';
import DataProcessingTabs from '../assessment-rank/DataProcessingPanels';
import { secControlAttackImpacts, secMeasureAttackImpacts, CSIRTAttackImpacts } from '../../services/attackImpactMatrix';
import { getMatches, getSurveyMatches, getCSIRTMatches, getRealValues, getRealValuesOfArea } from '../../services/outputService';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  /* paper: {
    marginTop: theme.spacing(80),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }, */
  button: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(5)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return ['Data gathering', 'Data processing', 'Analysis result'];
}

/* function getStepContent(step) {
  switch (step) {
    case 0:
      return <VerticalTabs step={step}></VerticalTabs>;
    case 1:

      return <DataProcessingTabs step={step}></DataProcessingTabs>;
    case 2:
     
      return 'mammata';
    //return <VerticalTabs step={step}></VerticalTabs>;
    default:
      return 'Unknown step';
  }
} */

const HorizontalLinearStepper = ({ assessment, endAssessment, isReadOnlyMode, secControlRecords, secMeasureRecords, CSIRTRecords, addAttackSum, customerprofile, history }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    calculateAttackValueSums();
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    endAssessment(assessment, history);
    setActiveStep(0);
  };

  const handleFinish = () => {
    if (isReadOnlyMode) history.push('/dashboard');
    else endAssessment(assessment, history);
  };

  const incrementValuesSum = (items, items2, items3, items4, items5, items6) => {
    var newResults = [];
    for (var i = 0; i < items.length; i++) {
      var obj = {};
      obj['id'] = i;
      var realValue = items[i] + items2[i] + items3[i];
      var realValueOfArea = items4[i] + items5[i] + items6[i];
      obj.realValue = realValue;
      obj.realValueOfArea = realValueOfArea;
      newResults.push(obj)
    }
    addAttackSum(newResults)
  };

  const calculateAttackValueSums = () => {

    var items = getRealValues(getMatches(secControlRecords), secControlAttackImpacts);
    var items2 = getRealValues(getSurveyMatches(secMeasureRecords), secMeasureAttackImpacts)
    var items3 = getRealValues(getCSIRTMatches(CSIRTRecords), CSIRTAttackImpacts)
    var items4 = getRealValuesOfArea(getMatches(secControlRecords),
      secControlAttackImpacts,
      customerprofile.attacks,
      customerprofile.riskOfArea
    );
    var items5 = getRealValuesOfArea(getSurveyMatches(secMeasureRecords),
      secMeasureAttackImpacts,
      customerprofile.attacks,
      customerprofile.riskOfArea
    )

    var items6 = getRealValuesOfArea(getCSIRTMatches(CSIRTRecords),
      CSIRTAttackImpacts,
      customerprofile.attacks,
      customerprofile.riskOfArea
    )

    incrementValuesSum(items, items2, items3, items4, items5, items6)
  }



  function getStepContent(step) {
    switch (step) {
      case 0:
        return <VerticalTabs step={step}></VerticalTabs>;
      case 1:
        return <DataProcessingTabs step={step}></DataProcessingTabs>;
      case 2:
        return <ResultsChart></ResultsChart>
      //return <VerticalTabs step={step}></VerticalTabs>;
      default:
        return 'Unknown step';
    }
  }


  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          handleFinish()
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <Grid container justify="left">
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};

HorizontalLinearStepper.propTypes = {
  assessment: PropTypes.array.isRequired,
  endAssessment: PropTypes.func.isRequired,
  addAttackSum: PropTypes.func.isRequired,
  isReadOnlyMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    assessment: state.assessment.assessment,
    secControlRecords: state.assessment.assessment.securitycontrol,
    secMeasureRecords: state.assessment.assessment.survey,
    CSIRTRecords: state.assessment.assessment.csirt,
    customerprofile: state.assessment.assessment.customerprofile,
    currentResults: state.assessment.assessment.results,
    isReadOnlyMode: state.assessment.isReadOnlyMode
  };
};

export default connect(mapStateToProps, {
  endAssessment, addAttackSum
})(HorizontalLinearStepper);
