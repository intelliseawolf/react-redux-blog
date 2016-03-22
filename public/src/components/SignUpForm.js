import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SignUpForm extends Component {
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
  }

  render() {
    const {asyncValidating, fields: { name, username, email, password, confirmPassword }, handleSubmit, submitting } = this.props;

    return (
      <div className="container">
      <form onSubmit={handleSubmit(this.props.signUpUser.bind(this))}>
        <div className={`form-group ${name.touched && name.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Full Name*</label>
          <input type="text" className="form-control" {...name} />
          <div className="help-block">
            {name.touched ? name.error : ''}
          </div>
        </div>

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

        <div className={`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Email*</label>
          <input type="email" className="form-control" {...email} />
          <div className="help-block">
            {email.touched ? email.error : ''}
          </div>
          <div className="help-block">
          {asyncValidating === 'email' ? 'validating..': ''}
          </div>
        </div>

        <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Password*</label>
          <input type="password" className="form-control" {...password} />
          <div className="help-block">
            {password.touched ? password.error : ''}
          </div>
        </div>
        <div className={`form-group ${confirmPassword.touched && confirmPassword.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Confirm Password*</label>
          <input type="password" className="form-control" {...confirmPassword} />
          <div className="help-block">
            {confirmPassword.touched ? confirmPassword.error : ''}
          </div>
        </div>
        <button type="submit" className="btn btn-primary"  disabled={submitting} >Submit</button>
        <Link to="/" className="btn btn-error">Cancel</Link>
      </form>


      <br/>
      <br/>
      <br/>

      <div className="panel panel-default">
      <div className="panel-heading"><h3>Check out Form Validations!</h3></div>
      <div className="panel-body">
        <b>Learn how to implement it by going through: <a href="https://medium.com/@rajaraodv/adding-a-robust-form-validation-to-react-redux-apps-616ca240c124" target="_blank">Adding A Robust Form Validation To React Redux Apps</a></b> 
        </div>
      </div>

      </div>

    );
  }
}

export default SignUpForm;