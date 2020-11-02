import React, { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  children: ReactNode;
}

export function BlogPost({ children }: Props) {
  return (
    <div className="page">
      <Header />
      <div className="markdown">{children}</div>
      <Footer />
    </div>
  );
}
