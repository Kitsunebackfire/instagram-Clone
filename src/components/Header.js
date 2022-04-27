import React from "react";
import ImageUpload from "./ImageUpload";
import { Modal } from "@mui/material";
const Header = ({
  user,
  storage,
  setUser,
  signUp,
  username,
  password,
  email,
  setUsername,
  setPassword,
  setEmail,
  signIn,
  openSignIn,
  setOpenSignIn,
  handleCloseSignIn,
  handleOpenSignIn,
  openSignUp,
  setOpenSignUp,
  handleOpenSignUp,
  handleCloseSignUp,
}) => {
  return (
    <div>
      <img
        alt="instagram logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU"
        className="app__headerImage"
      />
      {user?.displayName ? (
        <ImageUpload user={user} storage={storage} />
      ) : (
        <h4>Login to upload</h4>
      )}
      <Modal
        user={user}
        setUser={setUser}
        signUp={signUp}
        username={username}
        password={password}
        email={email}
        setUsername={setUsername}
        setPassword={setPassword}
        setEmail={setEmail}
        signIn={signIn}
        openSignIn={openSignIn}
        setOpenSignIn={setOpenSignIn}
        handleCloseSignIn={handleCloseSignIn}
        handleOpenSignIn={handleOpenSignIn}
        openSignUp={openSignUp}
        setOpenSignUp={setOpenSignUp}
        handleCloseSignUp={handleCloseSignUp}
        handleOpenSignUp={handleOpenSignUp}
      />
    </div>
  );
};

export default Header;
