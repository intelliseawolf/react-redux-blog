var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var expressJwt = require('express-jwt');


var postSchema = mongoose.Schema({
  title: String,
  categories: [String],
  content: String,
  authorName: String,
  authorUsername: String,
  authorId: String
});

postSchema.plugin(timestamps);

var Post = mongoose.model('Post', postSchema);



router.get('/posts', function(req, res, next) {
  Post
    .find({})
    .select({
      content: 0,
      __v: 0,
      updatedAt: 0,
      createdAt: 0
    })
    .limit(100)
    .sort({
      createdAt: -1
    })
    .exec(function(err, posts) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Could not retrieve posts'
        });
      }
      res.json(posts);
    });

});

router.post('/posts', function(req, res, next) {
  var user = req.user;
  if (!user) {
    return res.status(401).json({
      message: 'Permission Denied!'
    });
  } else if (!user.isEmailVerified) {
    return res.status(401).json({
      message: 'Permission Denied! Please verify your email.'
    });
  }

  console.dir(req.user);

  var body = req.body;
  var title = body.title;
  var categories = body.categories;
  var content = body.content;

  //simulate error if title, categories and content are all "test"
  //This is demo field-validation error upon submission. 
  if (title === 'test' && categories === 'test' && content === 'test') {
    return res.status(403).json({
      message: {
        title: 'Title Error - Cant use "test" in all fields!',
        categories: 'Categories Error',
        content: 'Content Error',
        submitmessage: 'Final Error near the submit button!'
      }
    });
  }

  if (!title || !categories || !content) {
    return res.status(400).json({
      message: 'Error title, categories and content are all required!'
    });
  }

  var post = new Post({
    title: title,
    categories: categories.split(','),
    content: content,
    authorName: req.user.name,
    authorUsername: req.user.username,
    authorId: req.user._id,
    authorImage: req.user.image
  });


  post.save(function(err, post) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not save post'
      });
    }
    res.json(post);
  });
});

router.get('/posts/:id', function(req, res, next) {
  Post.findById({
    '_id': req.params.id
  }, function(err, post) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not retrieve post w/ that id'
      });
    }
    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      })
    }
    res.json(post);
  });
});

router.delete('/posts/:id', function(req, res, next) {
  if (!req.user || !req.user.isEmailVerified) {
    return res.status(401).json({
      message: 'Permission Denied!'
    });
  }

  var id = req.params.id;
  if (id.length != 24) {
    return res.json({
      message: 'id must be a valid 24 char hex string'
    });
  }
  var id = mongoose.Types.ObjectId(req.params.id); //convert to objectid
  Post.findByIdAndRemove(id, function(err, post) {
    if (err)
      throw err;

    if (!post) {
      return res.status(404).json({
        message: 'Could not delete post'
      });
    }

    res.json({
      result: 'Post was deleted'
    });

  });
});

router.post('/posts/validate/fields', function(req, res, next) {
  var body = req.body;
  var title = body.title ? body.title.trim() : '';

  Post.findOne({
    'title': new RegExp(title, "i")
  }, function(err, post) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not find post for title uniqueness'
      });
    }
    if (post) {
      res.json({
        title: 'Title "' + title + '" is not unique!'
      });
    } else {
      return res.json({});
    }

  });
});


module.exports = router;