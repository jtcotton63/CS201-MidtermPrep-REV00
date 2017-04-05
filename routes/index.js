var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

router.get('/comments', function(req, res, next) {
    Comment.find(function(err, comments) {
        if(err)
            return next(err); 

        res.json(comments);
    });
});

router.get('/comments/:commentId', function(req, res) {
    var commentId = req.params.commentId;
    
    var query = Comment.findById(commentId);
    query.exec(function (err, comment){
        if(err)
            return next(err);
        
        if (!comment) 
            return res.status(500).send("Comment " + commentId + " doesn't exist");
        
        res.json(comment);
    });
});

router.post('/comments', function(req, res, next) {
    var comment = new Comment(req.body);
    
    comment.save(function(err, comment){
        if(err)
            return next(err); 
        
        res.json(comment);
    });
});

module.exports = router;
