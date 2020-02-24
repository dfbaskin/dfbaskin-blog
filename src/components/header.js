import React from "react";
import { Link } from "gatsby";
import TwitterLink from "./twitterLink";
import GitHubLink from "./githubLink";
import MeLink from "./meLink";
import { useSiteMetadata } from "../hooks";
import "./header.css";

const Header = () => {
  const { title } = useSiteMetadata();
  return (
    <header className="blog-header">
      <div>
        <h1>
          <Link to="/">{title}</Link>
        </h1>
      </div>
      <div>
        <TwitterLink />
        <GitHubLink />
        <MeLink />
      </div>
    </header>
  );
};

export default Header;
