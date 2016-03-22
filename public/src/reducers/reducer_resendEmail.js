
import { RESEND_VALIDATION_EMAIL, RESEND_VALIDATION_EMAIL_SUCCESS, RESEND_VALIDATION_EMAIL_FAILURE, RESET_RESEND_EMAIL_STATE } from '../actions/resendEmail';



const INITIAL_STATE = {sentAgain: false, error:null, loading: false};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    
    case RESEND_VALIDATION_EMAIL:
    return { ...state, sentAgain: false, error:null, loading: true};
    case RESEND_VALIDATION_EMAIL_SUCCESS:
    return { ...state, sentAgain: true, error:null, loading: false};
    case RESEND_VALIDATION_EMAIL_FAILURE:
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors       
    return { ...state, sentAgain: false, error:error, loading: false};
    case RESET_RESEND_EMAIL_STATE:
    return { ...state, sentAgain: false, error:null, loading: false};
    default:
    return state;
  }
}
