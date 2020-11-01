import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function BlogPost({ children }: Props) {
  return (
    <div>
      <h1>Blog Post</h1>
      {children}
    </div>
  );
}
