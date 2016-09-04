import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import SignUpFormContainer from '../containers/SignUpFormContainer.js';

class SignUp extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="posts_new"/>
        <SignUpFormContainer />
      </div>
    );
  }
}


export default SignUp;
