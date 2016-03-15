import { connect } from 'react-redux'
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure } from '../actions/posts';

import PostsList from '../components/PostsList';


const mapStateToProps = (state) => {
  return { 
    postsList: state.posts.postsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts()).then((response) => {
            !response.error ? dispatch(fetchPostsSuccess(response.payload)) : dispatch(fetchPostsFailure(response.payload));
          });
    }
  }
}


const PostsListContainer = connect(mapStateToProps, mapDispatchToProps)(PostsList)

export default PostsListContainer
