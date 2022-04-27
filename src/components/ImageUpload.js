import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { postsColRef } from "../firebase";
import { addDoc, serverTimestamp } from "firebase/firestore";
import "./ImageUpload.css";
import { Button, Input } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import Icon from "@mdi/react";
import { mdiCameraPlusOutline } from "@mdi/js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ImageUpload = ({ storage, user }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const captionInput = document.getElementById("caption_input");
  const fileUpload = document.getElementById("file_upload");
  // modal control
  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => setOpenUpload(true);
  const handleCloseUpload = () => setOpenUpload(false);
  // field controls

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
          handleCloseUpload();
        } catch (err) {
          console.log(err);
        }
      });

      /**/
    });
  };

  return (
    <div className="imageUpload">
      <button onClick={handleOpenUpload}>
        <Icon
          path={mdiCameraPlusOutline}
          alt="icon"
          style={{ height: "100px" }}
        />
      </button>
      <Modal
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="imageUpload__modal">
            <img
              alt="instagram logo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU"
              className="modal__image"
            />

            <Input
              className="imageUpload__captionInput"
              id="caption_input"
              type="text"
              placeholder="Enter a caption..."
              onChange={(e) => setCaption(e.target.value)}
            />
            <Input
              className="imageUpload__fileInput"
              id="file_upload"
              type="file"
              onChange={handleChange}
            />
            <Button className="imageUpload__uploadBtn" onClick={handleUpload}>
              Upload
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ImageUpload;

/*<div className="imageUpload">
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
    </div> */
