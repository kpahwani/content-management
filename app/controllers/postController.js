const Posts = require('../models/posts');
const logger = require('../helpers/logger');
const { uploadFile } = require('../helpers/aws/uploader');
const { S3_BUCKET_NAME: bucketName } = require('config');


const createPost = async (data, file) => {
    logger.info('CreatePost Data Controller...');
    const fileS3Details = await uploadFile(file);
    logger.info('post created', fileS3Details);
    const createdPost = await Posts.create({...data, objectKey: file.filename, s3Bucket: bucketName});
    return {
        msg: 'post created',
        data: createdPost
    };
}

module.exports = {
    createPost
};
