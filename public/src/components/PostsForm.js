import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Header from '../containers/HeaderContainer.js';

class PostsForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newPost.post && !nextProps.newPost.error) {
      this.context.router.push('/');
    }
  }

  render() {
    const {asyncValidating, fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <div>
      <form onSubmit={handleSubmit(this.props.createPost.bind(this))}>
        <div className={`form-group ${title.touched && title.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Title*</label>
          <input type="text" className="form-control" {...title} />
          <div className="help-block">
            {title.touched ? title.error : ''}
          </div>
          <div className="help-block">
            {asyncValidating === 'title'? 'validating..': ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-error' : ''}`}>
          <label>Categories*</label>
          <input type="text" className="form-control" {...categories} />
          <div className="help-block">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-error' : ''}`}>
          <label>Content*</label>
          <textarea className="form-control" {...content} />
          <div className="help-block">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-error">Cancel</Link>
      </form>
      <br/>
      <br/>
      <br/>

      <div className="panel panel-default">
      <div className="panel-heading">Check out Form Validations!</div>
      <div className="panel-body">
        <ol>
         <li>Client Side Validation:
              <br/>1. Click on <b>Title</b> field and leave it empty.
              <br/>2. Then click on another field(to trigger blur).
              <br/> <b>Result: "Enter a Title"</b>
         </li>

         <li>Instant Server Side Validation:
              <br/>1. Enter "redux" in the <b>Title</b> field. 
              <br/>2. Then click on Categories field (to trigger blur). 
              <br/> <b>Result: Title "redux" is not unique!</b>
               <br/><i>Note: We ask server to see if a post w/ title "redux" is unique. The server is hardcoded to return "Title "redux" is not unique!" if the title is "redux" for demo purposes</i>
        </li>
         </ol>

      </div>
</div>

      </div>

    );
  }
}

export default PostsForm;