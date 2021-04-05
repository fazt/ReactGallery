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

    console.log(uploadedObject);

    const urlImage = `https://${config.BucketName}.${config.Endpoint}/${file.name}`;

    // save the url in databae
    const savedImage = new Image({
      url: urlImage,
      key: file.name,
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

router.get("/api/images/:id", async (req, res) => {
  const images = await Image.findById(req.params.id);
  res.json(images);
});

router.delete("/api/images/:id", async (req, res) => {
  const deletedImage = await Image.findByIdAndDelete(req.params.id);

  await s3
    .deleteObject({
      Bucket: config.BucketName,
      Key: deletedImage.key,
    })
    .promise();

  res.json(deletedImage);
});

export default router;
