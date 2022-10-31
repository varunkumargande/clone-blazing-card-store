import React, { useState } from "react";
import Link from "next/link";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
import IconLike from "../../Icons/IconLike";
import { streamLikeDislike } from "../../../api/stream/streams_api";
import { useEffect } from "react";
import {
  likedRequest,
  dislikedRequest,
  removeLikedRequest,
} from "../../../store/likedStream/action";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { getStreamScheduleDate } from "../../../utilities/utils";

function LiveStreamStatus({
  isLive,
  uuid,
  detail,
  likeDislikeStream,
  showLoginModal,
  auth,
}) {
  const [likedStream, setLikedStream] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!detail?.islike) {
      setLikedStream((state) => [...state, detail.uuid]);
    }
  }, []);

  const handleLikeUnlike = async (uuid) => {
    let arr = [];
    const userDetails = JSON.parse(sessionStorage.getItem("blazingUser"));
    if (uuid && !!userDetails) {
      const data = {
        stream_id: uuid,
        user_id: userDetails?.id,
      };
      const response = await streamLikeDislike(data);
      if (response.status) {
        if (response?.data?.is_like) {
          dispatch(likedRequest(uuid));
        } else {
          dispatch(removeLikedRequest(uuid));
          dispatch(dislikedRequest(uuid));
        }
      }
    } else {
      if (showLoginModal) {
        showLoginModal(true);
      }
    }
  };

  const getlikedStatus = (id) => {
    if (likeDislikeStream?.likedData?.length != 0) {
      if (likeDislikeStream?.likedData?.indexOf(id) > -1) {
        return "like flex flex-center justify-center liked";
      }
    }
    if (likeDislikeStream?.dislikedData?.length != 0) {
      if (likeDislikeStream?.dislikedData?.indexOf(id) > -1) {
        return "like flex flex-center justify-center";
      }
    }
    if (detail.islike == 1) {
      return "like flex flex-center justify-center liked";
    } else {
      return "like flex flex-center justify-center";
    }
  };

  const handleLikeButton = () => {
    if (auth?.isLoggedIn) {
      return (
        <>
          <button
            className={getlikedStatus(uuid)}
            id={uuid + "-btn"}
            onClick={() => handleLikeUnlike(uuid)}
          >
            <span>
              <IconLike />
            </span>
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            className={"like flex flex-center justify-center"}
            onClick={() => showLoginModal(true)}
          >
            <span>
              <IconLike />
            </span>
          </button>
        </>
      );
    }
  };

  return (
    <>
      {isLive ? (
        <>
          <div className="tme-wrap live flex flex-center justify-center">
            <span>1.2K</span> <button className="live"></button>
          </div>
          {handleLikeButton()}
        </>
      ) : (
        <>
          <div className="tme-wrap flex flex-center justify-center">
            <span>{getStreamScheduleDate(detail.scheduleDate, detail.scheduletime)}</span>
          </div>
          {handleLikeButton()}
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(LiveStreamStatus);
