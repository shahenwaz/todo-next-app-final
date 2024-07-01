import Layout from "../components/Layout";
import "@/styles/globals.css";
import { Fragment } from "react";
import { DefaultSeo } from "next-seo";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Fragment>
        <DefaultSeo
          title="Nextjs Starter Modified"
          description="Your_Website_Description"
          canonical="Your_Website_Homepage"
          openGraph={{
            url: "Your_Website_Homepage",
            title: "Nextjs Starter Modified",
            description: "Your_Website_Description",
            images: [
              {
                url: "OG_Image_Link",
                width: 800,
                height: 600,
                alt: "Og Image",
              },
            ],
            site_name: "Nextjs Starter Modified",
            type: "website",
          }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Fragment>
    </>
  );
}
