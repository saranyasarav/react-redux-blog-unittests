import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const users = useSelector(selectAllUsers);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        const resultAction = await dispatch(
          addNewPost({ title, body: content, userId })
        );
        unwrapResult(resultAction);

        setTitle("");
        setContent("");
        setUserId("");

        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="container mt-4">
      <h2 className="mb-4"> Add a New Post</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="postTitle" className="form-label">
            Post Title:
          </label>
          <input
            type="text"
            id="postTitle"
            className="form-control"
            data-testid="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postAuthor" className="form-label">
            Author:
          </label>
          <select
            id="postAuthor"
            className="form-select"
            data-testid="postAuthor"
            value={userId}
            onChange={onAuthorChanged}
          >
            <option value=""></option>
            {usersOptions}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="postContent" className="form-label">
            {" "}
            Post Content:
          </label>
          <textarea
            id="postContent"
            className="form-control"
            data-testid="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
