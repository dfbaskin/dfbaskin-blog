import React, { ReactNode } from "react";
import Head from "next/head";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  contentClassName?: string;
  title?: string;
  children: ReactNode;
}

export function Layout({ contentClassName, children, title }: Props) {
  const pageTitle = title || "Web, Windows, and Whatnot";
  const contentName =
    "default-width" + (contentClassName ? ` ${contentClassName}` : "");
  return (
    <div className="page">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <div className={contentName}>{children}</div>
      <Footer />
    </div>
  );
}
