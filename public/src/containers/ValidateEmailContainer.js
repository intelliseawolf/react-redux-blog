import ValidateEmail from '../components/ValidateEmail.js';
import { connect } from 'react-redux'
import {validateEmail, validateEmailSuccess, validateEmailFailure } from '../actions/users';
import { reduxForm } from 'redux-form';



const mapStateToProps = (state) => {
  return { 
    user: state.user
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    validateEmail: () => {
      dispatch(validateEmail(ownProps.token)).then((response) => {
            !response.error ? dispatch(validateEmailSuccess(response.payload)) : dispatch(validateEmailFailure(response.payload));
          });
    }
  }
}


const ValidateEmailContainer = connect(mapStateToProps, mapDispatchToProps)(ValidateEmail)

export default ValidateEmailContainer;
