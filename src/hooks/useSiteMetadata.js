import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query SiteMetadataQuery {
        site {
          siteMetadata {
            title
            author
            description
            siteUrl
            social {
              twitter
              github
            }
          }
        }
      }
    `
  );
  return siteMetadata;
};
