import axios from 'axios';

//Resend validation email
export const RESEND_VALIDATION_EMAIL = 'RESEND_VALIDATION_EMAIL';
export const RESEND_VALIDATION_EMAIL_SUCCESS = 'RESEND_VALIDATION_EMAIL_SUCCESS';
export const RESEND_VALIDATION_EMAIL_FAILURE = 'RESEND_VALIDATION_EMAIL_FAILURE';
export const RESET_RESEND_EMAIL_STATE = 'RESET_RESEND_EMAIL_STATE';


const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function resendValidationEmail(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/resendValidationEmail`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });

  return {
    type: RESEND_VALIDATION_EMAIL,
    payload: request
  };
}

export function resendValidationEmailSuccess(message) {
  return {
    type: RESEND_VALIDATION_EMAIL_SUCCESS,
    payload: message
  };
}

export function resendValidationEmailFailure(error) {
  return {
    type: RESEND_VALIDATION_EMAIL_FAILURE,
    payload: error
  };
}

export function resetResendEmailState() {
  return {
    type: RESET_RESEND_EMAIL_STATE
  };
}