import PostsForm from '../components/PostsForm.js';
import { resetNewPost } from '../actions/posts';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewPost());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    newPost: state.posts.newPost
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsForm);

