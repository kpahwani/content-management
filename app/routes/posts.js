const postRoutes = require('express').Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const postController = require('../controllers/postController')
const logger = require('../helpers/logger');


postRoutes.post('/create_post', upload.single('mediaFile'), async (req, res) => {
    logger.info('uploaded file',req.file)
    const createdPost = await postController.createPost(req.body, req.file);
    res.send(createdPost);
});

module.exports = postRoutes;
