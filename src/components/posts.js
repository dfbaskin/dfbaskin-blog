import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import SEO from "./seo";
import Layout from "./layout";

export default function PageTemplate({ data: { mdx } }) {
  return (
    <Layout>
      <SEO title={mdx.frontmatter.title} />
      <article className="markdown default-width">
        <header>
          <h1>{mdx.frontmatter.title}</h1>
        </header>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </article>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;
