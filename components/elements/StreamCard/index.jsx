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

  return (
    <div className="card-list flex flex-center">
      <div class="inner-card-list">
        <div className="image" >
          <CloudinaryImage
            imageUrl={
              DefaultServices?.GetFullImageURL(detail, "profile")
            }
            keyId={DefaultServices?.GetFullImageURL(detail, "profile")}
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
                DefaultServices?.GetFullImageURL(detail, "vendor")
              }
              keyId={DefaultServices?.GetFullImageURL(detail, "vendor")}
              transformation={ImageTransformation.profileImageCard}
              alternative={""}
            />

            {/* ToDo: Need to remove old image code. Keeping it right now for reference */}
            {/* <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/static/img/no-image.png";
              }}
              src={DefaultServices?.GetFullImageURL(detail, "vendor", "25", "25", false)}
              alt="Card"
            /> */}

            {stringFormatter(detail?.username)}
          </h3>
          <div className="disc">
            {detail?.title?.substring(0, 25) + "..."}
          </div>
          <button className="cate-btn">
            {stringFormatter(detail?.subCategory_name)}
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
