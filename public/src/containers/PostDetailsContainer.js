import PostDetails from '../components/PostDetails.js';
import { fetchPost, fetchPostSuccess, fetchPostFailure, resetActivePost, resetDeletedPost } from '../actions/posts';
import { connect } from 'react-redux';



function mapStateToProps(globalState, ownProps) {
  return { activePost: globalState.posts.activePost, postId: ownProps.id };
}

const mapDispatchToProps = (dispatch) => {
  return {
  	 fetchPost: (id) => {
    	dispatch(fetchPost(id))
      	.then((data) => 
          {
          	!data.error ? dispatch(fetchPostSuccess(data.payload)) : dispatch(fetchPostFailure(data.payload));
          }) 
  	 },
     resetMe: () =>{
      //clean up both activePost(currrently open) and deletedPost(open and being deleted) states
        dispatch(resetActivePost());
        dispatch(resetDeletedPost());
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
