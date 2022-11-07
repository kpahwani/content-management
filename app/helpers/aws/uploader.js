const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const s3client = require('./s3Client');
const { S3_BUCKET_NAME: bucketName } = require('config');

const uploadFile = async (file) => {
    const fileStream = fs.createReadStream(file.path);
    

    const uploadParams = {
        Bucket: bucketName,
        Key: file.filename,
        Body: fileStream
    };
    return await s3client.send(new PutObjectCommand(uploadParams));
};

const deleteFile = async (filename) => {
    const objParams = {
        Bucket: bucketName,
        Key: filename
    };
    return await s3client.send(new DeleteObjectCommand(objParams));
};

module.exports = { 
    uploadFile,
    deleteFile
 };
