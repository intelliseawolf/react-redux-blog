import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Header from '../containers/HeaderContainer.js';

class ForgotPwdForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
  //     this.context.router.push('/');
  //   }

  //   //error
  //   //Throw error if it was not already thrown (check this.props.user.error to see if alert was already shown)
  //   //If u dont check this.props.user.error, u may throw error multiple times due to redux-form's validation errors
  //   if(nextProps.user.status === 'signin' && !nextProps.user.user && nextProps.user.error && !this.props.user.error) {
  //     alert(nextProps.user.error.message);
  //   }
  // }

  render() {
    const {forgotPwd, asyncValidating, fields: {email}, handleSubmit, submitting, user } = this.props;

    return (
      <div className="container">
      <form onSubmit={handleSubmit(forgotPwd.bind(this))}>

        <div className={`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Email*</label>
          <input type="email" className="form-control" {...email} />
          <div className="help-block">
            {email.touched ? email.error : ''}
          </div>
        </div>
        <button type="submit" className="btn btn-primary"  disabled={submitting} >Submit</button>
        <Link to="/" className="btn btn-error">Cancel</Link>
      </form>

      </div>

    );
  }
}

export default ForgotPwdForm;