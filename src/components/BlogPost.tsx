import React, { ReactNode } from "react";
import { Layout } from "./Layout";

interface Props {
  children: ReactNode;
}

export function BlogPost({ children }: Props) {
  return (
    <Layout>
      <div className="markdown">{children}</div>
    </Layout>
  );
}
