import React, { useState } from "react";

import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import HeaderMobile from "../../components/shared/headers/HeaderMobile";
import NavigationList from "../../components/shared/navigation/NavigationList";
import FooterFullwidth from "../../components/shared/footers/FooterFullwidth";
import { useEffect } from "react";
import { pageDetApi } from "../../api";
import BreadCrumb from "../../components/elements/BreadCrumb";
import Router, { useRouter } from "next/router";
import ThemeChanger from "../../components/elements/color/themeControl";
import useNetwork from "../../components/reusable/NetworkCheck";

const pageDetail = () => {
  const router = useRouter();
  const [det, setDet] = useState("");
  const [postLoading, setPostLoading] = useState(true);
  // Router.events.on('routeChangeStart', (url) => )
  const network = useNetwork();

  useEffect(() => {
    if (network === false) {
      Router.push("/network-error");
    }
  }, []);

  const pdid = router.query.pdid;
  useEffect(() => {
    if (pdid === undefined) {
      Router.push("/page/page-404");
    }

    if (pdid) {
      pageDetApi(pdid, setDet, setPostLoading);
    }

    Router.events.on("routeChangeStart", (url) => {
      const nextPid = url.split("/").pop();
      if (nextPid !== "" && isNaN(parseInt(nextPid)) === false) {
        pageDetApi(nextPid, setDet, setPostLoading);
        setPostLoading(true);
      }
    });
  }, [pdid]);

  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Page Detail",
    },
  ];

  return (
    <div className="site-content">
      <HeaderDefault />
      <HeaderMobile />
      <NavigationList />
      <ThemeChanger />
      <BreadCrumb breacrumb={breadCrumb} />

      {postLoading === false ? (
        <div className="ps-page--simple" style={{ padding: "40px" }}>
          {det !== "" && <h3>{det.title} :</h3>}
          {det !== "" && (
            <div
              dangerouslySetInnerHTML={{
                __html: det.content
                  .replaceAll("&amp;", "&")
                  .replaceAll("&lt;", "<")
                  .replaceAll("&gt;", ">")
                  .replaceAll("&quot;", '"')
                  .replaceAll("&#39;", "'")
                  .replaceAll("&sbquo;", "‚")
                  .replaceAll("&#61;", "=")
                  .replaceAll("&#45;", "-")
                  .replaceAll("&hellip;", "…")
                  .replaceAll("&commat;", "@")
                  .replaceAll("&copy;", "©")
                  .replaceAll("&#35;", "#")
                  .replaceAll("&ldquo;", "“")
                  .replaceAll("&rsquo;", "’")
                  .replaceAll("&lsquo;", "‘")
                  .replaceAll("&trade;", "™")
                  .replaceAll("&reg;", "®")
                  .replaceAll("&ndash;", "–")
                  .replaceAll("&eacute;", "é")
                  .replaceAll("&euro;", "€")
                  .replaceAll("&pound;", "£"),
              }}
            />
          )}
        </div>
      ) : (
        <div className="ps-page--product">
          {" "}
          <div className="ps-container">
            <center>
              <img
                src="/static/img/Loader/loader_blue.gif"
                style={{ height: "100px", width: "100px" }}
              />
            </center>
          </div>
        </div>
      )}
      <FooterFullwidth />
    </div>
  );
};

export default pageDetail;

// pageDetail.getInitialProps=async(ctx)=>({
//     query:ctx.query
// })
