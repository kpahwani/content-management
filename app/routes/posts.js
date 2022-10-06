const postRoutes = require('express').Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const postController = require('../controllers/postController')
const logger = require('../helpers/logger');
const asyncRouteHandler =require('../helpers/asyncRouteHandler');


postRoutes.post('/post', upload.single('mediaFile'), asyncRouteHandler(async (req, res) => {
    logger.info('uploaded file',req.file)
    const createdPost = await postController.createPost(req.body, req.file);
    res.send(createdPost);
}));


postRoutes.get('/post/:postId', async (req, res) => {
    const postId = req.params.postId;
    const postData = await postController.getPost(postId);
    res.send({
        status: 'success',
        data: postData
    });
});


postRoutes.get('/posts/:userId', async (req, res) => {
    const userId = req.params.userId;
    const posts = await postController.getPosts(userId);
    res.send({
        status: 'success',
        data: posts
    });
});


postRoutes.delete('/post/:postId', async (req, res) => {
    const postId = req.params.postId;
    const deletedPost = await postController.deletePost(postId);
    res.send(deletedPost);
});

module.exports = postRoutes;
