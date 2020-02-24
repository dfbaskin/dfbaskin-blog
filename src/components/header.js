import React from "react"
import { Link } from "gatsby"
import { useSiteMetadata } from "../hooks"

const Header = () => {
  const { title } = useSiteMetadata()
  return (
    <header>
      <div>
        <h1>
          <Link to="/">{title}</Link>
        </h1>
      </div>
    </header>
  )
}

export default Header
