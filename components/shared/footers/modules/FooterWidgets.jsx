import React from "react";
//import {ConnectPlugin} from '../../../connectPlugins';
import Link from "next/link";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const FooterWidgets = ({ footerDet, footerPage }) => {
  const router = useRouter();
  return (
    <div className="ps-footer__widgets" style={{ paddingBottom: "0px" }}>
      <div className="ftr-top">
        <div className="flex ftrtop-lft">
          <aside className="widget widget_footer">
            <div className="ps-custom-footer-container">
              {footerPage &&
                footerPage.map((page) => (
                  <div className="footer-column-container">
                    <h4 className="">{page.groupName}</h4>

                    {page &&
                      page.page.map((pagedet) => (
                        <>
                          <Link
                            href="/page-detail/[pdid]"
                            as={`/page-detail/${pagedet.slugName}`}
                            key={pagedet.pageId}
                          >
                            <p>{pagedet.title}</p>
                          </Link>
                        </>
                      ))}
                  </div>
                ))}
            </div>
          </aside>
        </div>
        <div>
          <h4 style={{ color: "white" }}>Social</h4>
          <ul className="ps-list--social" style={{ display: "block" }}>
            <li>
              <a className="facebook" href={footerDet.facebook} target="_blank">
                <img src="/static/img/facebook.png" />
              </a>
            </li>
            <li>
              <a className="twitter" href={footerDet.twitter} target="_blank">
                <img src="/static/img/twitter.png" />
              </a>
            </li>
            <li>
              <a
                className="google-plus"
                href={footerDet.google}
                target="_blank"
              >
                {/* <img src="/static/img/google+.png"/> */}
              </a>
            </li>
          </ul>
        </div>
        <div className="ftrtop-rht" style={{}}>
          <aside className="widget widget_footer widget_contact-us">
            <h4 className="widget-title1 footer-color">Contact us</h4>
            <div className="widget_content footer-contact-info">
              <p className="footer-color">
                <i
                  class="fa fa-map-marker"
                  aria-hidden="true"
                  style={{ fontSize: "25px", paddingRight: "16px" }}
                ></i>
              </p>
              <h3 className="footer-color">
                <i
                  class="fa"
                  style={{ fontSize: "25px", paddingRight: "15px" }}
                >
                  &#xf095;
                </i>
                {footerDet.storeTelephone}
              </h3>

              <p className="footer-color">
                <i
                  class="fa fa-envelope"
                  aria-hidden="true"
                  style={{
                    fontSize: "25px",
                    paddingRight: "15px",
                    color: "white",
                  }}
                ></i>
                {footerDet.storeAddress}
                {/* <a href={"mailto:"+footerDet.storeEmail} target="_blank">{footerDet.storeEmail}</a> */}
                blazingcards@gmail.com
              </p>
              <p className="footer-color">
                <i
                  class="fa fa-clock-o"
                  aria-hidden="true"
                  style={{
                    fontSize: "25px",
                    paddingRight: "15px",
                    color: "white",
                  }}
                ></i>
                Mon - Sun / 9:00AM - 8:00PM
              </p>
            </div>
            <a
              className="google-plus"
              href="https://play.google.com/store/apps/details?id=com.piccosoft.blazingcards"
              target="_blank"
            >
              <img src="/static/img/playstore.png" />
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return (state = state.setting);
};

export default connect(mapStateToProps)(FooterWidgets);
