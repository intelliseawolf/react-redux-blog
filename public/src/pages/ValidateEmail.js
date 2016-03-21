import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import ValidateEmailContainer from '../containers/ValidateEmailContainer.js';

class ValidateEmail extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="posts_new"/>
        <ValidateEmailContainer token={this.props.params.token}/>
      </div>
    );
  }
}


export default ValidateEmail;
