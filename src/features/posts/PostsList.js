import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postsSlice";
import PostPart from "./PostPart";
import { Link } from "react-router-dom";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const postError = useSelector(getPostsError);

  const [visiblePosts, setVisiblePosts] = useState(5);

  const handleLoadMore = (e) => {
    e.preventDefault();
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
  };

  const handleLoadMoreOnScroll = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
  };

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (scrollTop + windowHeight >= documentHeight - 50) {
      handleLoadMoreOnScroll();
    }
  }, []);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  let content;
  if (postStatus === "loading") {
    content = <p className="text-center mt-4">Loading...</p>;
  } else if (postStatus === "Succeeded") {
    // Reverse the array of posts to display the latest one first
    const reversedPosts = posts.slice().reverse();
    content = reversedPosts.slice(0, visiblePosts).map((post) => (
      <div key={post.id} className="blog-post show">
        <PostPart post={post} />
      </div>
    ));
  } else if (postStatus === "failed") {
    content = <p className="text-danger text-center mt-4">{postError}</p>;
  }

  return (
    <div className="row">
      <div className="sub-title">
        <h2>React JS Blog</h2>
        <Link to="post">
          <i className="icon-plus"></i>
        </Link>
      </div>
      <div className="col-md-12 content-page">
        {content}
        {visiblePosts < posts.length && (
          <div className="col-md-12 text-center">
            <button
              onClick={handleLoadMore}
              id="load-more-post"
              className="load-more-button"
            >
              Load
            </button>
          </div>
        )}
        {visiblePosts >= posts.length && (
          <div id="post-end-message" className="col-md-12 text-center">
            End of Entries
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;
