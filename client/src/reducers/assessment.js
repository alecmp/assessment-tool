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
  GET_ASSESSMENT,
  GET_ASSESSMENTS,
  UPDATE_RISK_LEVEL,
  ADD_ATTACK_SUM,
  CLEAR_PROFILE
} from '../actions/types';
import * as reducerService from '../services/reducerService';

const initialState = {
  assessments: [],
  assessment: null,
  loading: true,
  isReadOnlyMode: false,
  error: {}
};

function assessmentReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ASSESSMENTS:
      return {
        ...state,
        assessments: payload,
        loading: false
      };

    case ADD_ASSESSMENT:
      return {
        ...state,

        assessment: {
          ...state.assessment,
          date: Date.now,
          customerprofile: {},
          virtualpenetration: [],
          securitycontrol: reducerService.getSecurityControlInitialState(),
          csirt: reducerService.getCsirtInitialState(),
          survey: reducerService.getSurveyInitialState(),
          results: reducerService.getResultsInitialState(),
        },
        isReadOnlyMode: false,
        loading: false
      };
    case DELETE_ASSESSMENT:
      return {
        ...state,
        assessments: state.assessments.filter(
          (assessment) => assessment._id !== payload
        ),
        loading: false
      };
    case GET_ASSESSMENT:
      return {
        ...state,
        assessment: payload,
        loading: false,
        isReadOnlyMode: true
      };
    case ASSESSMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_RISK_LEVEL:
      return {
        ...state,
        assessment: { ...state.assessment, customerprofile: payload },

        loading: false
      };

    case ADD_CUSTOMER_PROFILE:
      return {
        ...state,
        assessment: {
          ...state.assessment,
          customerprofile: payload
        },

        loading: false
      };
    case EDIT_CUSTOMER_PROFILE:
      return {
        ...state,
        assessment: {
          ...state.assessment,
          customerprofile: payload
        },
        loading: false
      };

    case ADD_ATTACK:
      return {
        ...state,
        assessment: {
          ...state.assessment,
          virtualpenetration: [...state.assessment.virtualpenetration, payload]
        },

        loading: false
      };

    case DELETE_ATTACK:
      return {
        ...state,
        assessment: {
          ...state.assessment,
          virtualpenetration: state.assessment.virtualpenetration.filter(
            (attack) => attack.id !== payload
          )
        },
        loading: false
      };

    case EDIT_ATTACK:
      return {
        ...state,
        assessment: {
          ...state.assessment,
          virtualpenetration: state.assessment.virtualpenetration.map(
            (attack) => (attack.id === payload.id ? payload : attack)
          )
        },
        loading: false
      };
    case EDIT_CONTROL:
      return {
        ...state,
        assessment: {
          ...state.assessment,
          securitycontrol: state.assessment.securitycontrol.map((control) =>
            control.id === payload.id ? payload : control
          )
        },
        loading: false
      };
    case EDIT_SERVICE:
      return {
        ...state,
        assessment: {
          ...state.assessment,
          csirt: state.assessment.csirt.map((service) =>
            service.id === payload.id ? payload : service
          )
        },
        loading: false
      };
    case EDIT_SECURITY_MEASURE:
      return {
        ...state,
        assessment: {
          ...state.assessment,
          survey: state.assessment.survey.map((measure) =>
            measure.id === payload.id ? payload : measure
          )
        },
        loading: false
      };

    case ADD_ATTACK_SUM:
      return {
        ...state,
        assessment: {
          ...state.assessment,
          results: payload
        },
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        assessment: null,
        assessments: []
      };

    default:
      return state;
  }
}

export default assessmentReducer;
