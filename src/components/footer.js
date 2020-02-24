import React from "react";
import "./footer.css";
import { Link } from "gatsby";

const Footer = ({ children }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="blog-footer default-width">
      <div>
        © {year}, <Link to="/about">Dave F. Baskin</Link>
      </div>
      <div>{children}</div>
    </footer>
  );
};

export default Footer;
