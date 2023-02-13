const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config({
  path: "../config/config.env",
});

// AWS Config
aws.config.update({
  accessKeyId: process.env.AWS_IAM_USER_KEY,
  secretAccessKey: process.env.AWS_IAM_USER_SECRET,
  region: "ap-south-1",
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const S3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: S3,
    acl: "public-read",
    bucket: BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

module.exports = { upload };
