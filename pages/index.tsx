import React from "react";
import posts from "../public/posts/posts.json";
import { BlogPostSummary } from "../src/components/BlogPostSummary";
import { Layout } from "../src/components/Layout";
import { BlogPostMetadata } from "../src/models/BlogPostMetadata";

interface Props {
  posts: BlogPostMetadata[];
}

export default function HomePage({ posts }: Props) {
  return (
    <Layout>
      {posts.map((post, idx) => {
        return <BlogPostSummary key={idx} post={post} />;
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts,
    },
  };
}
