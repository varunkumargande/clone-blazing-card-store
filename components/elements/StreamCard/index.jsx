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
import DefaultServices from "../../Services/DefaultServices";
import { SignUPGoogle } from "../../partials/Modal/Modal";
import { connect } from "react-redux";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { ImageTransformation } from "../../Constants/imageTransformation";

function StreamCard({ detail, isLive, showLoginModal, auth }) {
  const handleRouting = (id) => {
    Router.push("/profile?userId=" + id);
  };

  const handleStreamingLink = (detail) => {
    Router.push(`/streaming?stream=${detail.id}&uuid=${detail.uuid}`);
  };

  const getCloudImagePath = (type) => {
    let imagePath = "";
    let image = "";
    if (type === "profile") {
      imagePath = detail?.preview_image_path;
      image = detail?.preview_image;
    } else if (type === "vendor") {
      imagePath = detail?.vendor_image_path;
      image = detail?.vendor_image;
    };
    if (!image) {
      image = "defaultCard.png";
    }
    if (imagePath) {
      return `${imagePath}${image}`;
    } else {
      return image;
    }
  }

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
        <div className="image" >
          <CloudinaryImage
            imageUrl={
              getCloudImagePath("profile")
            }
            keyId={getCloudImagePath("profile")}
            transformation={ImageTransformation.card}
            onClick={() => handleStreamingLink(detail)}
            alternative={""}
          />

          {/* ToDo: Need to remove old image code. Keeping it right now for reference */}
          {/* <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/static/images/card.png";
              }}
              src={DefaultServices.GetFullImageURL(detail, "profile", "100", "100")}
              onClick={() => handleStreamingLink(detail)}
            />
          } */}
          <LiveStreamStatus
            isLive={detail?.isLive}
            uuid={detail.uuid}
            detail={detail}
            showLoginModal={showLoginModal}
          />
        </div>
        {/* </Link> */}
        <div className="text">
          <h3
            className="title flex flex-center"
            onClick={() => handleRouting(detail.user_id)}
          >
            <CloudinaryImage
              imageUrl={
                getCloudImagePath("vendor")
              }
              keyId={getCloudImagePath("vendor")}
              transformation={ImageTransformation.profileImageCard}
              alternative={""}
            />

            {/* ToDo: Need to remove old image code. Keeping it right now for reference */}
            {/* <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/static/img/no-image.png";
              }}
              src={DefaultServices?.GetFullImageURL(detail, "vendor", "25", "25")}
              alt="Card"
            /> */}

            {stringFormatter(detail?.username)}
          </h3>
          <div className="disc">
            {detail?.description?.substring(0, 50) + "..."}
          </div>
          <button className="cate-btn">
            {stringFormatter(detail?.category_name)}
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(StreamCard);
