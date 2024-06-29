import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <>
      <div className="row">
        <div className="sub-title">
          <h2>Add New Post</h2>
          <Link to="/">
            <i className="icon-home"></i>
          </Link>
        </div>
        <div className="col-md-12 content-page">
          <div className="col-md-12 blog-post show">
            <div className="row margin-top-30">
              <div className="col-md-12">
                <div className="row">
                  <form>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <input
                          type="text"
                          id="postTitle"
                          className="form-control"
                          placeholder="Post Title"
                          data-testid="postTitle"
                          name="postTitle"
                          value={title}
                          onChange={onTitleChanged}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <select
                        id="postAuthor"
                        className="form-group form-control"
                        data-testid="postAuthor"
                        value={userId}
                        onChange={onAuthorChanged}
                      >
                        <option value="" disabled>
                          Author
                        </option>
                        {usersOptions}
                      </select>
                    </div>
                    <div className="col-sm-12">
                      <div className="textarea-message form-group">
                        <textarea
                          id="postContent"
                          placeholder="Post Content"
                          rows="5"
                          className="textarea-message form-control"
                          data-testid="postContent"
                          name="postContent"
                          value={content}
                          onChange={onContentChanged}
                        />
                      </div>
                    </div>
                    <div className="text-center col-sm-3 py-10">
                      <button
                        type="button"
                        onClick={onSavePostClicked}
                        disabled={!canSave}
                        className="btn btn-primary form-control"
                      >
                        Save Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPostForm;
