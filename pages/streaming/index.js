import React, { useEffect } from "react";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import NavigationList from "../../components/shared/navigation/NavigationList";
import ThemeChanger from "../../components/elements/color/themeControl";
import useNetwork from "../../components/reusable/NetworkCheck";
import Router, { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Footer from "../../components/partials/LandingPage/Footer";
import IconBack from "../../components/Icons/IconBack";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";
import Head from "next/head";
const Streaming = dynamic(() => import("../../components/elements/streaming"), {
  ssr: false,
});

function StreamingPage(data) {
  console.log(data, "data")
  const SeoData = data?.data?.data;
  const network = useNetwork();
  const { isMobile } = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    if (network === false) {
      Router.push("/network-error");
    }
  }, []);

  //go back to previous page
  const handleBackButton = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>{SeoData?.title}</title>
        <meta name="description" content={SeoData?.description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={SeoData?.title} />
        <meta property="og:description" content={SeoData?.description} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_CLOUD_IMAGE_URL}w_280,h_398,c_fill,q_auto,fl_any_format,dpr_auto/blazing/${SeoData?.image_path}/${SeoData?.preview_image}`}
        />
        <meta property="og:image:width" content="560" />
        <meta property="og:image:height" content="796" />
        <link
          rel="shortcut icon"
          href={`${process.env.NEXT_PUBLIC_CLOUD_IMAGE_URL}w_280,h_398,c_fill,q_auto,fl_any_format,dpr_auto/blazing/${SeoData?.image_path}/${SeoData?.preview_image}`}
        />
      </Head>
      <div className="streaming-screen">
        {isMobile ? (
          <div className="stream-top-header">
            <div className="edit-back" onClick={handleBackButton}>
              <IconBack />
            </div>
          </div>
        ) : (
          <HeaderDefault />
        )}
        <NavigationList />
        <ThemeChanger />
        <Streaming />
        <Footer />
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/stream/get-public-stream?uuid=${context.query.uuid}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};

export default StreamingPage;
