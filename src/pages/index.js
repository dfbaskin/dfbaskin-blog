import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostExcerpt from "../components/postExcerpt"
import { useStaticQuery, graphql } from "gatsby"
import { dateFormat } from "../utils/formats"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query AllPostsQuery {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          excerpt
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  const posts = data.allMdx.nodes.map(node => {
    return {
      excerpt: node.excerpt,
      title: node.frontmatter.title,
      slug: node.fields.slug,
      date: dateFormat.format(new Date(node.frontmatter.date)),
    }
  })
  return (
    <Layout>
      <SEO title="Home" />
      <div className="default-width">
        {posts.map((props, idx) => (
          <PostExcerpt key={idx} {...props} />
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage
