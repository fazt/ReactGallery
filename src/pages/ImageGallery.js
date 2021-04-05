import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ImageGallery = () => {
  const history = useHistory();
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/images");
      console.log(res);
      setImages(res.data);
    })();
  }, []);

  if (images.length === 0) {
    return <h1 className="h4 text-center">There are no Images yet</h1>
  }

  return (
    <div className="row">
      {images.map((image) => (
        <div
          className="col-md-4 p-1"
          key={image._id}
          onClick={() => history.push(`/images/${image._id}`)}
        >
          <div className="card bg-dark h-100 card-image">
            <div className="card-body">
              <img
                src={image.url}
                alt=""
                className="img-fluid h-100 w-100"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
