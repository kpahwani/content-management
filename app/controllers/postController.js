const Posts = require('../models/posts');
const { uploadFile } = require('../helpers/aws/uploader');
const { S3_BUCKET_NAME: bucketName } = require('config');


const createPost = async (data, file) => {
    console.log('Create Post Data');
    const fileS3Details = await uploadFile(file);
    console.log('post created', fileS3Details);
    const createdPost = await Posts.create({...data, objectKey: file.filename, s3Bucket: bucketName});
    return {
        msg: 'post created',
        data: createdPost
    };
}

module.exports = {
    createPost
};
