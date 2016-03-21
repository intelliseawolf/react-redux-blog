import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Header from '../containers/HeaderContainer.js';

class VerifyEmail extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    this.props.validateEmail(this.props.token);
  }


  componentWillReceiveProps(nextProps) {
    //if user is authenticated, then reroute the user to PostsList as authenticated user
    if(nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
      this.context.router.push('/');
    }
  }

  render() {
    const {error} = this.props.user;
    if(error) {
      return <div className="container"><div className="alert alert-danger">{error.message} </div></div>
    } else {
      return <div/>
    }
  }
}

export default VerifyEmail;