import React from "react";
import posts from "../public/posts/posts.json";
import { BlogPostSummary } from "../src/components/BlogPostSummary";
import { BlogPostMetadata } from "../src/models/BlogPostMetadata";

interface Props {
  posts: BlogPostMetadata[];
}

export default function HomePage({ posts }: Props) {
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post, idx) => {
        return <BlogPostSummary key={idx} post={post} />;
      })}
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts,
    },
  };
}
