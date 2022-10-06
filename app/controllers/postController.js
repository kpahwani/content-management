const Posts = require('../models/posts');
const logger = require('../helpers/logger');
const { CREATE_POST } = require('../consts/events');
const { push } = require('../events/sqs');
const { uploadFile, deleteFile } = require('../helpers/aws/uploader');
const dbHelper = require('../helpers/dbHelper/posts');
const { S3_BUCKET_NAME: bucketName } = require('config');


const createPost = async (data, file) => {
    logger.info('CreatePost Data Controller...');
    const fileS3Details = await uploadFile(file);
    logger.info('post created', fileS3Details);
    const createdPost = await Posts.create({...data, objectKey: file.filename, s3Bucket: bucketName});
    const feedServiceSqsPayload = {
        postId: createdPost._id
    }
    const sqsResponse = await push(CREATE_POST, feedServiceSqsPayload);
    logger.info('Post created: sqs message sent to feed service', sqsResponse);
    return {
        msg: 'post created',
        data: createdPost
    };
};

const getPost = async (postId) => {
    return await dbHelper.fetchPost(postId);
};

const getPosts = async (userId) => {
    return await dbHelper.fetchPosts(userId);
};

const deletePost = async (postId) => {
    logger.info('deletePost Controller...');
    const postDetails = await dbHelper.fetchPost(postId)
    const deletedFile = await deleteFile(postDetails.objectKey);
    logger.info('post deleted', deletedFile);
    const deletedPost = await dbHelper.deletePost(postId)
    return {
        msg: 'post deleted',
        data: deletedPost
    };
};

module.exports = {
    createPost,
    getPost,
    getPosts,
    deletePost
};
