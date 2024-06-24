import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section className="container mt-4">
        <h2> Post not found</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        // console.log(updatePost({ id: post?.id, title, body: content, userId }));
        dispatch(
          updatePost({ id: post?.id, title, body: content, userId })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section className="container mt-4">
      <h2 className="mb-4"> Edit Post</h2>
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
            Post Content:
          </label>
          <textarea
            type="text"
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
          className="btn btn-primary me-2"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>
        &nbsp;
        <button
          type="button"
          className="btn btn-danger me-2"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
