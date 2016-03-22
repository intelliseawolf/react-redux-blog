import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SignInForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
      this.context.router.push('/');
    }

    //error
    //Throw error if it was not already thrown (check this.props.user.error to see if alert was already shown)
    //If u dont check this.props.user.error, u may throw error multiple times due to redux-form's validation errors
    if(nextProps.user.status === 'signin' && !nextProps.user.user && nextProps.user.error && !this.props.user.error) {
      alert(nextProps.user.error.message);
    }
  }

  render() {
    const {asyncValidating, fields: {username, password}, handleSubmit, submitting, user } = this.props;

    return (
      <div className="container">
      <form onSubmit={handleSubmit(this.props.signInUser.bind(this))}>

        <div className={`form-group ${username.touched && username.invalid ? 'has-error' : ''}`}>
          <label className="control-label">@username*</label>
          <input  placeholder="@raja" type="text" className="form-control" {...username} />
          <div className="help-block">
            {username.touched ? username.error : ''}
          </div>
          <div className="help-block">
          {asyncValidating === 'username' ? 'validating..': ''}
          </div>
        </div>


        <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Password*</label>
          <input type="password" className="form-control" {...password} />
          <div className="help-block">
            {password.touched ? password.error : ''}
          </div>
        </div>
        <button type="submit" className="btn btn-primary"  disabled={submitting} >Submit</button>
        <Link to="/" className="btn btn-error">Cancel</Link>
      </form>


      <br/>
      <br/>
      <br/>

      <div className="panel panel-default">
      <div className="panel-heading"><h3>Check out Form Validations</h3></div>
      <div className="panel-body">
        <b>Learn how to implement it by going through: <a href="https://medium.com/@rajaraodv/adding-a-robust-form-validation-to-react-redux-apps-616ca240c124" target="_blank">Adding A Robust Form Validation To React Redux Apps</a></b>
        <br/>
        <br/>
        <div className="alert alert-warning">
          NOTE: The app now has JWT Authentication turned on. <b>Please *Sign up* using some dummy data and *Sign in* to create new posts</b>
        </div> 
      </div>
      </div>

      </div>

    );
  }
}

export default SignInForm;