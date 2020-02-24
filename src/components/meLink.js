import React from "react";
import { Link } from "gatsby";

const MeLink = () => {
  return (
    <Link to="/about" className="icon-link">
      <svg role="img" viewBox="0 0 24 24">
        <title>About Me</title>
        <path
          d="M12,0C5.4,0,0,5.8,0,13c0,4.6,2.2,8.7,5.6,11c0.7-6.2,3.4-10.9,6.7-10.9c3.2,0,5.9,4.5,6.6,10.6C22,21.3,24,17.4,24,13
	C24,5.8,18.6,0,12,0z M12.2,13c-2.3,0-4.1-2-4.1-4.4s1.8-4.4,4.1-4.4c2.3,0,4.1,2,4.1,4.4S14.5,13,12.2,13z"
        />
      </svg>
    </Link>
  );
};

export default MeLink;
