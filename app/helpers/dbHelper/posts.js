// require('../../models')
const Posts = require('../../models/posts');

const fetchPost = (postId) => {
    return Posts.findOne({
        _id: postId
    });
};


const fetchPosts = (userId) => {
    return Posts.find({
        userId
    });
};

const deletePost = (postId) => {
    return Posts.findOneAndDelete({
        _id: postId
    });
}

module.exports = {
    fetchPost,
    fetchPosts,
    deletePost
};
