import UpdateEmailForm from '../components/UpdateEmailForm.js';
import { resetUpdateEmailState } from '../actions/updateEmail';
import { resetValidateUserFields } from '../actions/validateUserFields';
import { connect } from 'react-redux';



// //Client side validation
// function validate(values) {
//   var errors = {};
//   var hasErrors = false;
//   if (!values.email || values.email.trim() === '') {
//     errors.username = 'Enter email';
//     hasErrors = true;
//   }
//    return hasErrors && errors;
// } 


// //For instant async server validation
// const asyncValidate = (values, dispatch) => {

//   return new Promise((resolve, reject) => {

//     dispatch(validateUserFields(values))
//     .then((response) => {
//         let data = response.payload.data;
//         //if status is not 200 or any one of the fields exist, then there is a field error
//         if(response.payload.status != 200 || data.username || data.email) {
//           //let other components know of error by updating the redux` state
//           dispatch(validateUserFieldsFailure(response.payload.data));
//            reject(data); //this is for redux-form itself
//          } else {
//             //let other components know that everything is fine by updating the redux` state
//           dispatch(validateUserFieldsSuccess(response.payload.data)); //ps: this is same as dispatching RESET_POST_FIELDS
//           resolve();//this is for redux-form itself
//         }
//       });
//   });
// };


// //For any field errors upon submission (i.e. not instant check)
// const validateAndUpdateEmail = (values, dispatch) => {

//   return new Promise((resolve, reject) => {

//   let jwtToken = sessionStorage.getItem('jwtToken');
//   if(!jwtToken || jwtToken === '') {
//     alert('Please Sign In');
//     reject();
//     return;
//   }

//    dispatch(updateEmail(values, jwtToken))
//     .then((response) => {
//         let data = response.payload.data;
//         //if any one of these exist, then there is a field error 
//         if(response.payload.status != 200) {
//           //let other components know of error by updating the redux` state
//           dispatch(updateEmailFailure(response.payload));
//            reject(data); //this is for redux-form itself
//          } else {
//           //let other components know that we got user and things are fine by updating the redux` state 
//           dispatch(updateEmailSuccess(response.payload)); 
//           dispatch(updateUserEmail(values));//update current user's email (in user's state)
//           resolve();//this is for redux-form itself
//         }
//       });
//   });
// };



const mapDispatchToProps = (dispatch) => {
  return {
   resetMe: () =>{
     dispatch(resetUpdateEmailState());
     dispatch(resetValidateUserFields());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return { 
    updateEmail: state.updateEmail,
    initialValues: {email: state.user.user && state.user.user.email}
  };
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
// export default reduxForm({
//   form: 'UpdateEmailForm', 
//   fields: ['email'], 
//   asyncValidate,
//   asyncBlurFields: ['email'],
//   validate 
// }, mapStateToProps, mapDispatchToProps)(UpdateEmailForm);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmailForm);
