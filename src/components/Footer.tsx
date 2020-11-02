import React, { ReactNode } from "react";
import Link from "next/link";
import styles from "./footer.module.css";

interface Props {
  children?: ReactNode;
}

export const Footer = ({ children }: Props) => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.blogFooter}>
      <div>
        © {year}, <Link href="/about">Dave F. Baskin</Link>
      </div>
      <div>{children}</div>
    </footer>
  );
};
