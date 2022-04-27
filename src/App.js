import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post";
import { postsColRef, db, auth, storage } from "./firebase";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Modal from "./components/Modal";
import ImageUpload from "./components/ImageUpload";

function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("null");
  const [displayName, setDisplayName] = useState("");
  // sign up modal state control
  const [openSignUp, setOpenSignUp] = useState(false);
  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);
  // sign in modal state control
  const [openSignIn, setOpenSignIn] = useState(false);
  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);
  // image state control

  const signIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("log in successful via sign in");
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user created", cred.user);
      })
      .catch((err) => {
        alert(
          `error occurred trying to createUserWithEmailAndPassword, ${err.message}`
        );
      });
  };

  const resetForms = () => {
    setEmail("");
    setPassword("");
  };

  // this useEffect monitors login status and updates displayName if one isn't present on the db
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log(authUser.displayName);

        // state tracking of user
        setUser(authUser);
        if (authUser.displayName) {
          setDisplayName(authUser.displayName);
          // dont update username
          handleCloseSignIn();
          handleCloseSignUp();
        } else {
          // if we just created someone
          updateProfile(auth.currentUser, { displayName: username })
            .then(() => {
              setDisplayName(authUser.displayName);
              //profile updates
              console.log("profile updated and assigned a username");
              //console.log(user);
              resetForms();
              handleCloseSignUp();
            })
            .catch((err) => {
              console.log(
                `error occured trying to update profile, error message: ${err}`
              );
            });
        }
      } else {
        // user has logged out
        setUser(null);
        console.log("no user logged in");
      }
    });
    return () => {
      // perform cleanup action before firing the use effect again
      return unsubscribe();
    };
  }, [username, user]);

  useEffect(() => {
    const q = query(postsColRef, orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      let postsArray = [];
      snapshot.forEach((doc) => {
        postsArray.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setPosts(postsArray);
    });
    return () => unsub();
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <img
          alt="instagram logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU"
          className="app__headerImage"
        />
        {user?.displayName ? (
          <ImageUpload user={user} storage={storage} />
        ) : (
          <h4 className="app__loginToUpload">Login to upload</h4>
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

      <div className="app__posts">
        {posts.map((post) => {
          return (
            <Post
              displayName={displayName}
              key={post.id}
              postId={post.id}
              username={post.username}
              imageUrl={post.imageUrl}
              caption={post.caption}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
