import React from "react";

export function BlogPost({ children }) {
  return (
    <div>
      <h1>Blog Post</h1>
      {children}
    </div>
  );
}
