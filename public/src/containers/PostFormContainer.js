import PostsForm from '../components/PostsForm.js';
import { createPost, createPostSuccess, resetNewPost } from '../actions/index';
import { reduxForm } from 'redux-form';

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if(!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

const mapDispatchToProps = (dispatch) => {
  return {
  	 createPost: (props) => {
    	dispatch(createPost(props))
      	.then((data) => 
          {
            dispatch(createPostSuccess(data.payload));
          });
  	 },
     resetMe: () =>{
        dispatch(resetNewPost());
     }
  }
}


function mapStateToProps(state, ownProps) {
  return { 
    newPost: state.posts.newPost
  };
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, mapStateToProps, mapDispatchToProps)(PostsForm);
