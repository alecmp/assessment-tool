import {
  getSecurityControlCollection,
  getSecurityControlFromId
} from './secControlService';
import {
  getServiceCollection,
  getServiceAreaCollection,
  getServiceAreaFromService
} from './csirtService';

import {
  getSecurityMeasureCollection,
  getSecurityMeasureFromId
} from './surveyService';

import { getAttackCollection } from './outputService'


export const getCustomerProfileInitialState = () => {
  var obj = {
    company: '',
    country: '',
  };
  return obj;
};

export const getSecurityControlInitialState = () => {
  const securityControl = [];
  for (var i = 0; i < getSecurityControlCollection().length; i++) {
    var obj = {
      id: i,
      upguard: false,
      sucuri: false
    };
    securityControl.push(obj);
  }
  return securityControl;
};

export const getCsirtInitialState = () => {
  const csirt = [];
  for (var i = 0; i < getServiceAreaCollection().length; i++) {
    for (var j = 0; j < getServiceCollection().length; j++) {
      if (getServiceAreaFromService(j) === i) {
        var obj = {
          serviceArea: i,
          id: j,
          value: 0
        };
        csirt.push(obj);
      }
    }
  }
  return csirt;
};

export const getSurveyInitialState = () => {
  const survey = [];

  for (var i = 0; i < getSecurityMeasureCollection().length; i++) {
    var obj = {
      id: i,
      value: null
    };
    survey.push(obj);
  }
  return survey;
};



export const getResultsInitialState = () => {
  const results = [];

  for (var i = 0; i < getAttackCollection().length; i++) {
    var obj = {
      id: i,
      realValue: 0,
      realValueOfArea: 0
    };
    results.push(obj);
  }
  return results;
};
