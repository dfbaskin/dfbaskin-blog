import React, { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="page">
      <Header />
      <div className="default-width">{children}</div>
      <Footer />
    </div>
  );
}
