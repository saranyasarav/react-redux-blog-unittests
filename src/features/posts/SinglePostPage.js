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
    <article className="container mt-4">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="card-text">{post.body}</p>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/post/edit/${post.id}`} className="btn btn-primary">
            Edit Post
          </Link>
          <PostAuthor userId={post.userId} />
        </div>
      </div>
    </article>
  );
};

export default SinglePostPage;
