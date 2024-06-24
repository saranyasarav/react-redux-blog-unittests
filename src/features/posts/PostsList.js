import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postsSlice";
import PostPart from "./PostPart";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const postError = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <p className="text-center mt-4">Loading...</p>;
  } else if (postStatus === "Succeeded") {
    // Reverse the array of posts to display the latest one first
    const reversedPosts = posts.slice().reverse();
    content = reversedPosts.map((post) => (
      <div key={post.id}>
        <div className="card-body">
          <PostPart post={post} />
        </div>
      </div>
    ));
  } else if (postStatus === "failed") {
    content = <p className="text-danger text-center mt-4">{postError}</p>;
  }

  return (
    <section className="container mt-4">
      <h2 className="mb-4">Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
