import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import ValidateEmailAlertContainer from '../containers/ValidateEmailAlertContainer.js';
import PostsList from '../containers/PostsListContainer.js';

class PostsIndex extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="posts_index"/>
        <ValidateEmailAlertContainer/>
        <PostsList />
      </div>
    );
  }
}


export default PostsIndex;
