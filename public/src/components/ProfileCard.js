import React from 'react';
import { Component } from 'react';

export default class ProfileCard extends Component {

  render() {
    let user = this.props.user.user;
    return (
      <div>
        <div><h4>Name:</h4> {user && user.name}</div>
        <div><h4>Username:</h4> {user && user.username}</div>
        <div><h4>Email:</h4> {user && user.email}</div>
        <br/><br/>        
      </div>
    );
  }
}
