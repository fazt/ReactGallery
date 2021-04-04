import { Router } from "express";
import AWS from "aws-sdk";
import Image from "../models/Image";
import config from "../config";

const router = Router();

const spacesEndpoint = new AWS.Endpoint(config.Endpoint);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
});

router.post("/api/images/upload", async (req, res) => {
  // if there is no file returns
  if (!req.files) return res.json({ msg: "no file" });

  console.log(req.body);
  const file = req.files.file;

  try {
    // S3 Upload
    const uploadedObject = await s3
      .putObject({
        ACL: "public-read",
        Bucket: config.BucketName,
        Key: file.name,
        Body: file.data,
      })
      .promise();

    const urlImage = `https://${config.BucketName}.${config.Endpoint}/${file.name}`;

    // save the url in databae
    const savedImage = new Image({
      url: urlImage,
      etag: uploadedObject.ETag,
      title: req.body.title,
    });

    await savedImage.save();

    return res.json(savedImage);
    // return res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.get("/api/images", async (req, res) => {
  const images = await Image.find();
  res.json(images);
});

export default router;
