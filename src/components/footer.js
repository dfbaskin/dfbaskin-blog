import React from "react";

import TwitterLink from "./twitterLink";
import GitHubLink from "./githubLink";
import MeLink from "./meLink";

const Footer = ({ children }) => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div>© {year}, Dave F. Baskin</div>
      <div>
        <TwitterLink />
        <GitHubLink />
        <MeLink />
      </div>
    </footer>
  );
};

export default Footer;
