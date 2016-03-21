import ForgotPwdForm from '../components/ForgotPwdForm.js';
import {forgotPwd, forgotPwdSuccess, forgotPwdFailure, resetUserFields } from '../actions/users';
import { reduxForm } from 'redux-form';


//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  }
  return hasErrors && errors;
} 


//For any field errors upon submission (i.e. not instant check)
const validateAndForgotPwd = (values, dispatch) => {

  return new Promise((resolve, reject) => {

   dispatch(forgotPwd(values))
    .then((response) => {
        let data = response.payload.data;
        //if any one of these exist, then there is a field error 
        if(response.payload.status != 200) {
          //let other components know of error by updating the redux` state
          dispatch(forgotPwdFailure(response.payload));
          reject(data); //this is for redux-form itself
         } else {
          //let other components know that we got user and things are fine by updating the redux` state 
          dispatch(forgotPwdSuccess(response.payload)); 
          resolve();//this is for redux-form itself
        }
      });
  });
};



const mapDispatchToProps = (dispatch) => {
  return {
   forgotPwd: validateAndForgotPwd,
   resetMe: () =>{
    //sign up is not reused, so we dont need to resetUserFields
    //in our case, it will remove authenticated users
     // dispatch(resetUserFields());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return { 
    user: state.user
  };
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'ForgotPwdForm', 
  fields: ['email'], 
  null,
  null,
  validate 
}, mapStateToProps, mapDispatchToProps)(ForgotPwdForm);
