import axios from 'axios';

//Resend validation email
export const FORGOT_PWD_EMAIL = 'FORGOT_PWD_EMAIL';
export const FORGOT_PWD_EMAIL_SUCCESS = 'FORGOT_PWD_EMAIL_SUCCESS';
export const FORGOT_PWD_EMAIL_FAILURE = 'FORGOT_PWD_EMAIL_FAILURE';
export const RESET_RESEND_EMAIL_STATE = 'RESET_FORGOT_PWD_EMAIL_STATE';


const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function forgotPwdEmail(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
     data: props,   
    url: `${ROOT_URL}/forgotPwdEmail`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });

  return {
    type: FORGOT_PWD_EMAIL,
    payload: request
  };
}

export function forgotPwdEmailSuccess(message) {
  return {
    type: FORGOT_PWD_EMAIL_SUCCESS,
    payload: message
  };
}

export function forgotPwdEmailFailure(error) {
  return {
    type: FORGOT_PWD_EMAIL_FAILURE,
    payload: error
  };
}

export function resetForgotPwdState() {
  return {
    type: RESET_FORGOT_PWD_EMAIL_STATE
  };
}