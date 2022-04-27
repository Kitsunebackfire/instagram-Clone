import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import { db } from "../firebase.js";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

function Post({ postId, username, index, caption, imageUrl, displayName }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const subCollection = collection(db, `posts/${postId}/comments`);
  const commentInputControl = document.querySelector(".commentInput");

  const handleComment = () => {
    try {
      addDoc(subCollection, {
        timestamp: serverTimestamp(),
        username: displayName,
        comment: comment,
      });
      setComment("");

      commentInputControl.value = "";
    } catch (err) {
      console.log(err);
    }
  };
  const q = query(subCollection, orderBy("timestamp", "asc"));
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = onSnapshot(q, (snapshot) => {
        console.log("setting comments from on snapshot listener");
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }

    return () => {
      console.log("performing cleanup");
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <div key={index} className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      {/*header -> avatar + username */}

      <img className="post__image" alt="sub" src={imageUrl} />
      {/* image */}
      <h4 className="post__text">
        <strong>{username}</strong>: {caption}
      </h4>
      {/* username + caption */}
      {comments.map((comment, index) => {
        return (
          <div key={index}>
            <span className="post__commentsUser">
              <strong>{comment.username}:</strong>{" "}
            </span>
            <span className="post__commentsComment">{comment.comment}</span>
          </div>
        );
      })}
      <input
        className="commentInput"
        onChange={(e) => {
          setComment(e.target.value);
        }}
        type="text"
        placeholder="Add a comment"
      ></input>
      <Button onClick={handleComment}>Post</Button>
    </div>
  );
}

export default Post;
