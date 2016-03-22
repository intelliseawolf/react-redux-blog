import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileCard from '../components/ProfileCard.js';


const mapStateToProps = (state) => {
  return { 
    user: state.user
  };
}

export default connect(mapStateToProps)(ProfileCard);
