import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { postsColRef } from "../firebase";
import { addDoc, serverTimestamp } from "firebase/firestore";
import "./ImageUpload.css";
import { Button } from "@mui/material";
import Icon from "@mdi/react";
import { mdiCameraPlusOutline } from "@mdi/js";

const ImageUpload = ({ storage, user }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const captionInput = document.getElementById("caption_input");
  const fileUpload = document.getElementById("file_upload");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const resetFields = () => {
    setCaption("");
    setImage(null);
    captionInput.value = "";
    fileUpload.value = null;
  };

  const handleUpload = () => {
    if (image === null) return;
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then(() => {
      alert("Image Uploaded");

      // upload is successful
      getDownloadURL(imageRef).then((url) => {
        try {
          addDoc(postsColRef, {
            timestamp: serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: user.displayName,
          });
          resetFields();
        } catch (err) {
          console.log(err);
        }
      });

      /**/
    });
  };

  return (
    <div className="imageUpload">
      <input
        className="imageUpload__captionInput"
        id="caption_input"
        type="text"
        placeholder="Enter a caption..."
        onChange={(e) => setCaption(e.target.value)}
      />

      <input
        className="imageUpload__fileInput"
        id="file_upload"
        type="file"
        onChange={handleChange}
      />
      <Button className="imageUpload__uploadBtn" onClick={handleUpload}>
        Upload
      </Button>
      <Icon path={mdiCameraPlusOutline} alt="icon" />
    </div>
  );
};

export default ImageUpload;
