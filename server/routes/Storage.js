const express = require("express");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
require("dotenv").config();
// get presigned url for s3
const credentials = {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION,
};
AWS.config.update({
  credentials: credentials,
});
const s3 = new AWS.S3();
const params = {
  Fields: {
    key: uuidv4(),
  },
  Conditions: [["content-length-range", 0, 10000000]],
  Expires: 600000,
  Bucket: process.env.S3_BUCKET,
};
router.get("/signedurl", requireLogin, async (req, res) => {
  const response = await s3.createPresignedPost(params, (err, data) => {
    res.json(data);
  });
});

module.exports = router;
