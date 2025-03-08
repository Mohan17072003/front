// src/components/Feed.js
import React, { useState, useEffect, useRef } from "react";
import { useVirtual } from "@tanstack/react-virtual";
import { Link } from "react-router-dom";
import lodash from "lodash";

// Simulate fetching posts
const fetchPosts = async (start, limit) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return Array.from({ length: limit }, (_, index) => ({
    id: start + index,
    type: index % 2 === 0 ? "text" : "image",
    content: index % 2 === 0 ? "This is a text post" : "https://via.placeholder.com/150"
  }));
};

const Feed = () => {
  const parentRef = useRef();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  
  // Virtualization setup
  const { virtualItems, totalSize } = useVirtual({
    size: posts.length,
    parentRef,
    estimateSize: () => 150, // Each post height
  });

  const loadPosts = async () => {
    setLoading(true);
    const newPosts = await fetchPosts(page * 20, 20);
    setPosts(prev => [...prev, ...newPosts]);
    setLoading(false);
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      <div ref={parentRef} style={{ height: "80vh", overflow: "auto" }}>
        <div style={{ height: totalSize }}>
          {virtualItems.map(virtualItem => (
            <div key={virtualItem.index} style={virtualItem.style}>
              <Post post={posts[virtualItem.index]} />
            </div>
          ))}
        </div>
      </div>

      {loading && <p>Loading more posts...</p>}

      <div onScroll={lodash.debounce(loadPosts, 500)} />
    </div>
  );
};

const Post = ({ post }) => {
  return (
    <div>
      {post.type === "text" ? (
        <p>{post.content}</p>
      ) : (
        <img src={post.content} alt="Post" />
      )}
      <Link to={`/post/${post.id}`}>View Details</Link>
    </div>
  );
};

export default Feed;
