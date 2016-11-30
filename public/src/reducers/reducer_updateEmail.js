
import { UPDATE_EMAIL, UPDATE_EMAIL_SUCCESS, UPDATE_EMAIL_FAILURE, RESET_UPDATE_EMAIL_STATE } from '../actions/updateEmail';



const INITIAL_STATE = {emailUpdated: false, error: null, loading: false};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    
    case UPDATE_EMAIL:
    return { ...state, emailUpdated: false, error: null, loading: true};
    case UPDATE_EMAIL_SUCCESS:
    return { ...state, emailUpdated: true, error: null, loading: false};
    case UPDATE_EMAIL_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors       
    return { ...state, emailUpdated: false, error: error, loading: false};
    case RESET_UPDATE_EMAIL_STATE:
    return { ...state, emailUpdated: false, error: null, loading: false};
    default:
    return state;
  }
}
