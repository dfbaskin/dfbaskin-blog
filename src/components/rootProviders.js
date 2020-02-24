import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Code } from "./code";

const components = {
  code: ({ className, children }) => {
    const props = {
      language: (className || "").replace(/^language-/, ""),
      codeString: children.toString(),
    };
    return <Code {...props} />;
  },
};

export default function RootProviders({ element }) {
  return <MDXProvider components={components}>{element}</MDXProvider>;
}
