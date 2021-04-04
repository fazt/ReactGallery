import { Schema, model } from "mongoose";

const ImageSchema = new Schema(
  {
    title: String,
    etag: String,
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Image", ImageSchema);
