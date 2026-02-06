import React, { useState } from "react";

const Feed = () => {
  const [posts, setposts] = useState([]);
  return (
    <section className="feed-section">
      <h1>Feed</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <img src={post.image} alt={post.caption} />
            <p>{post.caption}</p>
          </div>
        ))
      ) : (
        <h1>No posts available</h1>
      )}
    </section>
  );
};

export default Feed;
