import React, { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  contentClassName?: string;
  children: ReactNode;
}

export function Layout({ contentClassName, children }: Props) {
  const contentName =
    "default-width" + (contentClassName ? ` ${contentClassName}` : "");
  return (
    <div className="page">
      <Header />
      <div className={contentName}>{children}</div>
      <Footer />
    </div>
  );
}
