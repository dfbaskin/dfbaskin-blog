import React, { ReactNode } from "react";
import { Footer } from "./Footer";

interface Props {
  children: ReactNode;
}

export function BlogPost({ children }: Props) {
  return (
    <div className="markdown default-width">
      <h1>Blog Post</h1>
      {children}
      <Footer />
    </div>
  );
}
