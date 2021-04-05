import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ImageDetails = () => {
  const [image, setImage] = useState({
    title: "",
    url: "",
    _id: "",
  });
  const params = useParams();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/images/${params.id}`);
      setImage(res.data);
      // console.log(res.data);
    })();
    console.log("works") 
  }, [params.id]);

  const handleDelete = async () => {
    const res = await axios.delete(`/api/images/${params.id}`);
    console.log(res)
  }

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card bg-dark">
          <img src={image.url} alt={image.title} className="card-img-top" />
          <div className="card-body">
            <h1>{image.title}</h1>
            <button className="btn btn-outline-danger">
              <span className="material-icons" onClick={handleDelete}>delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
