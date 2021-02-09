import React, { ReactNode } from "react";
import { Layout } from "./Layout";
import { dateFormat } from "../utils/formats";
import styles from "./BlogPost.module.css";

interface Props {
  meta: {
    [key: string]: any;
  };
  children: ReactNode;
}

export function BlogPost({ meta, children }: Props) {
  const localizedDate = dateFormat.format(Date.parse(meta.date));
  return (
    <Layout title={meta.title}>
      <div className={styles.blogPost}>
        <header>
          <h1>{meta.title}</h1>
          <p>{localizedDate}</p>
        </header>
        <div className="markdown">{children}</div>
      </div>
    </Layout>
  );
}
