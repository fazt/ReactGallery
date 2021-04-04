import React, { useState } from "react";
import axios from "axios";

const ImageForm = () => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    const res = await axios.post("/api/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res);
  };

  return (
    <div className="col-md-4 offset-md-4">
      <div className="bg-warning">
        <div className="card bg-dark text-light rounded-0 p-4">
          <div className="card-body">
            <h1 className="h3 card-title">Upload an Image</h1>
            <form onSubmit={handleSubmit}>
              {/* Upload Input */}
              <input
                type="text"
                className="form-control bg-dark text-light my-3"
                placeholder="Write a title for your Photo"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="file"
                className="form-control bg-dark text-light rounded-0 border border-secondary"
                onChange={handleChange}
              />
              <div className="my-3">
                <button className="btn btn-success rounded-0 w-100">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
