import React from "react";
import { Helmet } from "react-helmet-async";

const SeoModule = (props: any) => {
  const { title, description, name, page_image, type, page_url } = props;
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      <meta property="og:image" content={page_image} />
      <meta property="og:url" content={page_url} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:site" content={name} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={page_url} />
      <meta name="twitter:image" content={page_image} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
};

export default SeoModule;
