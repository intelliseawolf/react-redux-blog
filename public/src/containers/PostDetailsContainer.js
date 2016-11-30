import PostDetails from '../components/PostDetails.js';
import { fetchPost, fetchPostSuccess, fetchPostFailure, resetActivePost, resetDeletedPost } from '../actions/posts';
import { connect } from 'react-redux';



function mapStateToProps(globalState, ownProps) {
  return {
    activePost: globalState.posts.activePost,
    postId: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (id) => {
      dispatch(fetchPost(id))
        .then((result) => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchPostFailure(result.payload.response.data));
          } else {
            dispatch(fetchPostSuccess(result.payload.data))
          }
        })
    },
    resetMe: () => {
      //clean up both activePost(currrently open) and deletedPost(open and being deleted) states
      dispatch(resetActivePost());
      dispatch(resetDeletedPost());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
