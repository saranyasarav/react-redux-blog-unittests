import React from "react";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";

const PostPart = ({ post }) => {
  return (
    <div className="col-md-12 blog-post show">
      <div className="post-title">
        <Link to={`post/${post.id}`}>
          <h1>{post.title}</h1>
        </Link>
      </div>
      <div className="post-info">
        <span>
          by <PostAuthor userId={post.userId} />
        </span>
      </div>
      <p>{post.body.substring(0, 75)}...</p>
      <Link
        to={`post/${post.id}`}
        className="button button-style button-anim fa fa-long-arrow-right"
      >
        <span>Read More</span>
      </Link>
    </div>

    // <article>
    //   <h3 className="card-title">{post.title}</h3>
    //   <p className="card-text">{post.body.substring(0, 75)}...</p>
    //   <p className="card-text">
    //     <Link to={`post/${post.id}`} className="btn btn-primary btn-sm me-2">
    //       View Post
    //     </Link>
    //     <PostAuthor userId={post.userId} />
    //   </p>
    // </article>
  );
};

export default PostPart;
