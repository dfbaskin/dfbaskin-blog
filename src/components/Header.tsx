import React from "react";
import Link from "next/link";
import { TwitterLink } from "./TwitterLink";
import { GitHubLink } from "./GithubLink";
import { MeLink } from "./MeLink";
import metadata from "../metadata.json";
import styles from "./Header.module.css";

export const Header = () => {
  const { title } = metadata;
  return (
    <header className={styles.blogHeader}>
      <div>
        <h1>
          <Link href="/">{title}</Link>
        </h1>
      </div>
      <div>
        &nbsp;
        <TwitterLink />
        <GitHubLink />
        <MeLink />
      </div>
    </header>
  );
};
