const postRoutes = require('express').Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const postController = require('../controllers/postController')


postRoutes.post('/create_post', upload.single('mediaFile'), async (req, res) => {
    console.log('file',req.file)
    const createdPost = await postController.createPost(req.body, req.file);
    res.send(createdPost);
});

module.exports = postRoutes;
