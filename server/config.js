import { config } from "dotenv";

config();

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  BucketName: process.env.BUCKET_NAME || "",
  Endpoint: process.env.ENDPOINT || "",
};
