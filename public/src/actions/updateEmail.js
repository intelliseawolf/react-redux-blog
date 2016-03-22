import axios from 'axios';


//update  email
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_EMAIL_SUCCESS = 'UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_FAILURE = 'UPDATE_EMAIL_FAILURE';
export const RESET_UPDATE_EMAIL_STATE = 'RESET_UPDATE_EMAIL_STATE';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function updateEmail(email, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: email,
    url: `${ROOT_URL}/updateEmail`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });

  return {
    type: UPDATE_EMAIL,
    payload: request
  };
}

export function updateEmailSuccess() {
  return {
    type: UPDATE_EMAIL_SUCCESS
  };
}

export function updateEmailFailure(error) {
  return {
    type: UPDATE_EMAIL_FAILURE,
    payload: error
  };
}

export function resetUpdateEmailState() {
  return {
    type: RESET_UPDATE_EMAIL_STATE
  };
}