import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import { Link, useParams } from "react-router-dom";

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  if (!post) {
    return (
      <section className="container mt-4">
        <h2> Post not found!</h2>
      </section>
    );
  }
  return (
    <>
      <div className="row">
        <div className="sub-title">
          <Link to={`/`}>
            <i className="icon-home"></i>
          </Link>
        </div>
        <div className="col-md-12 content-page">
          <div className="col-md-12 blog-post show">
            <div className="post-title">
              <h1>{post.title}</h1>
            </div>
            <div className="post-info">
              <span>
                by <PostAuthor userId={post.userId} />
              </span>
            </div>
            <p>{post.body}</p>
            <Link to={`/post/edit/${post.id}`} className="btn btn-primary">
              Edit Post
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePostPage;
