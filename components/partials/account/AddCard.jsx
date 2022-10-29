import React, { Component } from "react";
//import {ConnectPlugin} from '../../connectPlugins';
import Link from "next/link";
import { useEffect, useState } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AccountNav from "../../elements/AccountNav";
import { MoreOutlined } from "@ant-design/icons";
import { addressListApi, delAddressApi } from "../../../api";
import { editDetail } from "../../../store/setting/action";
import Head from "next/head";
import APIServices from "../../../services";
import { modalWarning } from "../../../api/intercept";

function AddCard() {
  const [cardData, setCardData] = useState(null);
  const [delStatus, setDelStatus] = useState(0);
  const [addressLoader, setAddressLoader] = useState(true);
  const [mousehowedit, setmousehowedit] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setDelStatus(0);
    addressList();
  }, [delStatus]);

  const addressList = () => {
    setAddressLoader(true);
    cardListApi();
  };

  const deleteAddress = (id) => {
    setmousehowedit(false);
    delAddressApi(id, setDelStatus);
  };

  const editAddess = (detail) => {
    dispatch(editDetail(detail));
    Router.push(
      "/account/addaddresses_edit/[eaid]",
      `/account/addaddresses_edit/${detail.addressId}`
    );
  };

  const mouseOverFunc = () => {
    setmousehowedit(true);
  };

  const cardListApi = async () => {
    const result = await APIServices.get(
      "customer-card-details/listCard",
      JSON.parse(sessionStorage.getItem("blazingUser")).id
    );
    if (result.status == 200) {
      setCardData(result.data);
      setAddressLoader(false);
    } else {
      modalWarning("error", result.data.message);
      setAddressLoader(false);
    }
  };

  return (
    <section className="cus-account-container">
      <div className="cus-account-subcontainer">
        <Head>
          <title>My Card Details</title>
        </Head>
        <div className="cus-position-container">
          <AccountNav keyValue={3} />
          <div className="cus-right-position">
            <div className="adr-subcontainer">
              <div className="adr-main-contain">
                <button onClick={(e) => Router.push("/account/addcarddetails")}>
                  + ADD NEW CARD
                </button>
                <div className="adr-list-container">
                  {addressLoader ? (
                    <>
                      <h3>....... loading .......</h3>
                    </>
                  ) : (
                    <>
                      {cardData != null ? (
                        <>
                          {cardData &&
                            cardData.map((data, index) => (
                              <div className="adr-card-container" key={index}>
                                <h4>
                                  <span className="homeorwork">
                                    {data.type}
                                  </span>
                                </h4>
                                <div className="adr-card-content">
                                  <h4>
                                    {data.card.brand} : XXXX XXXX XXXX
                                    {data.card.last4}
                                    <div className="adr-card-more-btn">
                                      <MoreOutlined
                                        onMouseOver={(e) => mouseOverFunc()}
                                        style={{ fontSize: "24px" }}
                                      />
                                      <div className="adr-edit-delete">
                                        {mousehowedit && (
                                          <ul>
                                            <li
                                              className="adr-ed-list"
                                              onClick={(e) =>
                                                deleteAddress(data.addressId)
                                              }
                                            >
                                              Delete
                                            </li>
                                          </ul>
                                        )}
                                      </div>
                                    </div>
                                  </h4>
                                  <p>
                                   
                                    expiary Date :
                                    {data.card.exp_month +
                                      "/" +
                                      data.card.exp_year}
                                    , country: {data.card.country}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </>
                      ) : (
                        <>No Card Found .</>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddCard;
