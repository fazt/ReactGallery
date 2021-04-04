import express from "express";
import fileUpload from "express-fileupload";
import path from "path";

import AWS from "aws-sdk";

const spacesEndpoint = new AWS.Endpoint("nyc3.digitaloceanspaces.com");

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
});

const app = express();

app.use(
  fileUpload({
    tempFileDir: "/temp", // put temp directory path here
  })
);

app.set("port", 4000);

app.post("/upload", async (req, res) => {
  if (!req.files) return res.json({ msg: "no file" });

  const file = req.files.file;

  try {
    // S3 Upload
    const object = await s3
      .putObject({
        ACL: "public-read",
        Bucket: "learningserver",
        Key: file.name,
        Body: file.data,
      })
      .promise();

    console.log(object);
    await file.mv(path.resolve(`./uploads/${file.name}`));

    return res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.listen(app.get("port"));
console.log("Server on port 4000");
