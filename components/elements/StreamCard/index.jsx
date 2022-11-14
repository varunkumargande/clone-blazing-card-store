import React from "react";
import LiveStreamStatus from "../LiveStreamStatus";
import { stringFormatter } from "../../../utilities/utils";
import Router from "next/router";
import DefaultServices from "../../Services/DefaultServices";
import { connect } from "react-redux";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { ImageTransformation } from "../../Constants/imageTransformation";
import { DefaultImagePath } from "../../Constants/defaultImage";

function StreamCard({ detail, showLoginModal, auth , isDate}) {
  const handleRouting = (id) => {
    Router.push("/profile?userId=" + id);
  };

  const handleStreamingLink = (detail) => {
    Router.push(`/streaming?stream=${detail.id}&uuid=${detail.uuid}`);
  };

  return (
    <div className="card-list flex flex-center">
      <div className="inner-card-list">
        <div className="image">
          <div className="innerImage" onClick={() => handleStreamingLink(detail)}>
            <CloudinaryImage
              imageUrl={
                DefaultServices?.GetFullImageURL(detail, "profile")
              }
              keyId={DefaultServices?.GetFullImageURL(detail, "profile")}
              transformation={ImageTransformation.card}
              alternative={""}
            />
          </div>

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
            uuid={detail?.uuid}
            detail={detail}
            showLoginModal={showLoginModal}
            isDate={isDate}
          />
        </div>
        <div className="text">
          <h3
            className="title flex flex-center"
            onClick={() => handleRouting(detail.user_id)}
          >
            {
              DefaultServices?.GetFullImageURL(detail, "vendor") !== DefaultImagePath.defaultImage ?
                <CloudinaryImage
                  imageUrl={
                    DefaultServices?.GetFullImageURL(detail, "vendor")
                  }
                  keyId={DefaultServices?.GetFullImageURL(detail, "vendor")}
                  transformation={ImageTransformation.profileImageCard}
                  alternative={""}
                /> :
                <span className="profile">
                <img
                  onError={() => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/static/images/profileImg.png";
                  }}
                  height={10}
                  width={7}
                  src={DefaultImagePath.defaultProfileImage}
                  alt="Profile"
                />
              </span>
            }
            


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
          <button className="cate-btn text-capitalize">
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
