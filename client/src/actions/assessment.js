import api from '../utils/api';
import { setAlert } from './alert';
import {
  ADD_ASSESSMENT,
  ADD_ATTACK,
  ADD_CUSTOMER_PROFILE,
  ASSESSMENT_ERROR,
  DELETE_ASSESSMENT,
  DELETE_ATTACK,
  EDIT_ATTACK,
  EDIT_CONTROL,
  EDIT_CUSTOMER_PROFILE,
  EDIT_SECURITY_MEASURE,
  EDIT_SERVICE,
  END_ASSESSMENT,
  GET_ASSESSMENT,
  GET_ASSESSMENTS,
  UPDATE_RISK_LEVEL,
  ADD_ATTACK_SUM
} from './types';

export const getAssessments = () => async (dispatch) => {
  try {
    const res = await api.get('/assessments');

    dispatch({
      type: GET_ASSESSMENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addAssessment = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_ASSESSMENT,
      payload: null
    });
  } catch (err) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteAssessment = (id) => async (dispatch) => {
  try {
    await api.delete(`/assessments/${id}`);

    dispatch({
      type: DELETE_ASSESSMENT,
      payload: id
    });

    dispatch(setAlert('Assessment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Read-Only assessment
export const getAssessment = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/assessments/${id}`);

    dispatch({
      type: GET_ASSESSMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const endAssessment = (formData, history) => async (dispatch) => {
  try {
    const res = await api.post('/assessments', formData);

    dispatch({
      type: END_ASSESSMENT,
      payload: formData
    });

    dispatch(setAlert('Assessment completed', 'success'));
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updateRiskLevel = (formData) => async (dispatch) => {
  try {
    // const res = await api.post('/assessments', formData);

    dispatch({
      type: UPDATE_RISK_LEVEL,
      payload: formData
    });

    // dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addCustomerProfile = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CUSTOMER_PROFILE,
      payload: formData
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const editCustomerProfile = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_CUSTOMER_PROFILE,
      payload: formData
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addAttack = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_ATTACK,
      payload: formData
    });
  } catch (err) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete experience
export const deleteAttack = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ATTACK,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit Virtual Penetration attack
export const editAttack = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_ATTACK,
      payload: formData
    });
  } catch (err) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit Security control
export const editControl = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_CONTROL,
      payload: formData
    });
  } catch (err) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Edit Security control
export const editService = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_SERVICE,
      payload: formData
    });
  } catch (err) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Edit Security measure
export const editSecurityMeasure = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_SECURITY_MEASURE,
      payload: formData
    });
  } catch (err) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addAttackSum = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_ATTACK_SUM,
      payload: formData
    });
  } catch (err) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};