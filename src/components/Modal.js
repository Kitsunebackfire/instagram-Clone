import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./Modal.css";
import { Input } from "@mui/material";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

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

export default function BasicModal({
  username,
  user,
  setUser,
  email,
  password,
  setEmail,
  setPassword,
  setUsername,
  signIn,
  openSignIn,
  setOpenSignIn,
  handleOpenSignIn,
  handleCloseSignIn,
  signUp,
  openSignUp,
  setSignUp,
  handleOpenSignUp,
  handleCloseSignUp,
}) {
  return (
    <div>
      {user ? (
        <Button
          onClick={() =>
            signOut(auth)
              .then(() => {
                console.log("sign out successful");
              })
              .catch((err) => {
                // An error happened.
                console.log(`sign out error occurred, ${err}`);
              })
          }
        >
          Sign Out
        </Button>
      ) : (
        <div>
          <Button onClick={handleOpenSignIn}>Sign In</Button>
          <Button onClick={handleOpenSignUp}>Sign Up</Button>
        </div>
      )}

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="modal__signup">
            <img
              alt="instagram logo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU"
              className="modal__image"
            />

            <Input
              placeholder="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              minLength="6"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn} style={{ marginTop: "10px" }}>
              Sign In
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openSignUp}
        onClose={handleCloseSignUp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="modal__signup">
            <img
              alt="instagram logo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU"
              className="modal__image"
            />
            <Input
              placeholder="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              minLength="6"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {}
            <Button
              onClick={signUp}
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
