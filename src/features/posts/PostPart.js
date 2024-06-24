import React from "react";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";

const PostPart = ({ post }) => {
  return (
    <article>
      <h3 className="card-title">{post.title}</h3>
      <p className="card-text">{post.body.substring(0, 75)}...</p>
      <p className="card-text">
        <Link to={`post/${post.id}`} className="btn btn-primary btn-sm me-2">
          View Post
        </Link>
        <PostAuthor userId={post.userId} />
      </p>
    </article>
  );
};

export default PostPart;
