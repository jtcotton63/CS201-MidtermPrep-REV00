var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    title: String,
    upvotes: {type: Number, default: 0},
});

CommentSchema.methods.upvote = function(next) {
    this.upvotes += 1;
    this.save(next);
};

mongoose.model('Comment', CommentSchema);