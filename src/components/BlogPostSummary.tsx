import React, { ReactNode } from "react";
import { BlogPostMetadata } from "../models/BlogPostMetadata";
import { dateFormat } from "../utils/formats";
import Link from "next/link";

interface Props {
  post: BlogPostMetadata;
}

export function BlogPostSummary({ post }: Props) {
  const {
    frontmatter: { title, date },
    slug,
  } = post;
  const localizedDate = dateFormat.format(Date.parse(date));

  return (
    <div>
      <h2>
        <Link href={slug}>{title}</Link>
      </h2>
      <p>{localizedDate}</p>
    </div>
  );
}
