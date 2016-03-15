import SignUpForm from '../components/SignUpForm.js';
import {signUpUser,  signUpUserSuccess, signUpUserFailure, resetUser, validateUserFields, validateUserFieldsSuccess, validateUserFieldsFailure, resetUserFields } from '../actions/users';
import { reduxForm } from 'redux-form';


//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter a name';
    hasErrors = true;
  }
  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username';
    hasErrors = true;
  }
  if(!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  }
  if(!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  if(!values.confirmPassword || values.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Enter Confirm Password';
    hasErrors = true;
  }

  if(values.confirmPassword  && values.confirmPassword.trim() !== '' && values.password  && values.password.trim() !== '' && values.password !== values.confirmPassword) {
    errors.password = 'Password And Confirm Password don\'t match';
    errors.password = 'Password And Confirm Password don\'t match';
    hasErrors = true;
  }
   return hasErrors && errors;
} 


//For instant async server validation
const asyncValidate = (values, dispatch) => {

  return new Promise((resolve, reject) => {

    dispatch(validateUserFields(values))
    .then((response) => {
        let data = response.payload.data;
        //if status is not 200 or any one of the fields exist, then there is a field error
        if(response.payload.status != 200 || data.title || data.categories || data.description) {
          //let other components know of error by updating the redux` state
          dispatch(validateUserFieldsFailure(response.payload));
           reject(data); //this is for redux-form itself
         } else {
            //let other components know that everything is fine by updating the redux` state
          dispatch(validateUserFieldsSuccess(response.payload)); //ps: this is same as dispatching RESET_POST_FIELDS
          resolve();//this is for redux-form itself
        }
      });
  });
};

//For any field errors upon submission (i.e. not instant check)
const validateAndSignUpUser = (values, dispatch) => {

  return new Promise((resolve, reject) => {

   dispatch(signUpUser(values))
    .then((response) => {
        let data = response.payload.data;
        //if any one of these exist, then there is a field error 
        if(response.payload.status != 200) {
          //let other components know of error by updating the redux` state
          dispatch(signUpUserFailure(response.payload));
           reject(data); //this is for redux-form itself
         } else {
          //store JWT Token to browser session storage 
          //If you use localStorage instead of sessionStorage, then this w/ persisted across tabs and new windows.
          //sessionStorage = persisted only in current tab
          sessionStorage.setItem('jwtToken', response.payload.data.token);
          //let other components know that we got user and things are fine by updating the redux` state 
          dispatch(signUpUserSuccess(response.payload)); 
          resolve();//this is for redux-form itself
        }
      });
  });
};



const mapDispatchToProps = (dispatch) => {
  return {
   signUpUser: validateAndSignUpUser,
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
  form: 'SignUpForm', 
  fields: ['name', 'username', 'email', 'password', 'confirmPassword'], 
  asyncValidate,
  asyncBlurFields: ['username'],
  validate 
}, mapStateToProps, mapDispatchToProps)(SignUpForm);
