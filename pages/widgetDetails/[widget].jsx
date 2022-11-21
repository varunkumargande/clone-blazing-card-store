import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { WidgetDetailsApi } from "../../api/home/widgetDetailsApi";
import Product from "../../components/elements/products/Product";
import { imageUrl } from "../../api/url";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import NavigationList from "../../components/shared/navigation/NavigationList";
import ThemeChanger from "../../components/elements/color/themeControl";
import HeaderMobile from "../../components/shared/headers/HeaderMobile";
const WidgetDetails = () => {
  const router = useRouter();
  const [widgedetail, setWidgets] = useState([]);
  const widget = router.query;

  useEffect(() => {
    if (widget !== undefined) {
      WidgetDetailsApi(widget, setWidgets);
    }
  }, []);

  return (
    <div>
      <HeaderDefault />
      <HeaderMobile />
      <NavigationList />
      <ThemeChanger />
      <div style={{ backgroundColor: "#f1f3f6", padding: "16px" }}>
        <div
          style={{
            backgroundColor: "#fff",
            paddingLeft: "10px",
            marginBottom: "16px",
          }}
        >
          <div className="ps-breadcrumb">
            <ul className="breadcrumb">
              <a>Widget List</a>
            </ul>
          </div>
        </div>
        <div className="ps-shopping">
          <div className="ps-shopping__content">
            <div className="ps-shopping-product">
              <div className="row">
                {widgedetail &&
                widgedetail.widgetItems &&
                widgedetail.widgetItems.length > 0 ? (
                  widgedetail &&
                  widgedetail.widgetItems &&
                  widgedetail.widgetItems.map((product) => (
                    <div
                      className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6 "
                      key={product.id}
                    >
                      <Product
                        product={product}
                        image={
                          product.image && product.image.containerName !== "/"
                            ? imageUrl +
                              "?path=" +
                              product.containerName +
                              "&name=" +
                              product.image +
                              "&width=400&height=200"
                            : "/static/img/no-image.png"
                        }
                      />
                    </div>
                  ))
                ) : (
                  <>
                    {/* <div className="ps-page--product"> */}
                    <div className="ps-container">
                      <div
                        style={{ paddingTop: "100px", paddingBottom: "200px" }}
                      >
                        <center>
                          <img
                            src="/static/img/Loader/loader_blue.gif"
                            style={{ height: "100px", width: "100px" }}
                          />
                        </center>
                      </div>
                    </div>

                    {/* </div> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WidgetDetails;
