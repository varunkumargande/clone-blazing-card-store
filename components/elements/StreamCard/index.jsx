import React from "react";
import Link from "next/link";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
import IconLike from "../../Icons/IconLike";
import LiveStreamStatus from "../LiveStreamStatus";
import { stringFormatter } from "../../../utilities/utils";
import Router from "next/router";
import { apiUrl, imageUrl } from "../../../api/url";
import { useEffect } from "react";

export default function StreamCard({ detail, isLive }) {
  const handleRouting = (id) => {
    Router.push("/profile/" + id);
  };

  const handleStreamingLink = (detail) => {
    Router.push(`/streaming?stream=${detail.id}&uuid=${detail.uuid}`);
  };

  const getImagePath = (type) => {
    if (
      detail?.preview_image_path &&
      detail?.preview_image &&
      type == "profile"
    ) {
      return (
        imageUrl +
        "?path=" +
        detail?.preview_image_path +
        "&name=" +
        detail?.preview_image +
        "&width=100&height=100"
      );
    } else if (
      detail?.vendor_image_path &&
      detail?.vendor_image &&
      type == "vendor"
    ) {
      return (
        imageUrl +
        "?path=" +
        detail?.vendor_image_path +
        "&name=" +
        detail?.vendor_image +
        "&width=25&height=25"
      );
    }
    if (type == "profile") {
      return "/static/images/card.png";
    } else {
      return "/static/images/profile.png";
    }
  };

  return (
    <div className="card-list flex flex-center">
      <div class="inner-card-list">
        <div className="image">
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/static/images/card.png";
            }}
            src={getImagePath("profile")}
            onClick={() => handleStreamingLink(detail)}
          />
          <LiveStreamStatus
            isLive={isLive}
            uuid={detail.uuid}
            detail={detail}
          />
        </div>
        {/* </Link> */}
        <div className="text">
          <h3
            className="title flex flex-center"
            onClick={() => handleRouting(detail.id)}
          >
            <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/static/img/no-image.png";
              }}
              src={getImagePath("vendor")}
              alt="Card"
            />

            {stringFormatter(detail?.title)}
          </h3>
          <div className="disc">{detail.description}</div>
          <button className="cate-btn">
            {stringFormatter(detail?.category_name)}
          </button>
        </div>
      </div>
    </div>
  );
}
