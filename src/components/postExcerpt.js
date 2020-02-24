import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import "./postExcerpt.css"

function PostExcerpt({ excerpt, title, slug, date }) {
  const link = `/posts/${slug}`
  return (
    <section className="post-excerpt">
      <h3>
        <Link to={link}>{title}</Link>
      </h3>
      <div>{date}</div>
      <div>{excerpt}</div>
    </section>
  )
}

PostExcerpt.propTypes = {
  excerpt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

export default PostExcerpt
