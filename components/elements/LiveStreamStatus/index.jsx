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
  removeLikedRequest
} from "../../../store/likedStream/action";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

function LiveStreamStatus({ isLive, uuid, detail, likeDislikeStream }) {
  const [likedStream, setLikedStream] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!detail?.islike) {
      setLikedStream((state) => [...state, detail.uuid]);
    }
  }, []);

  const handleLikeUnlike = async (uuid) => {
    let arr = [];
    const userDetails = JSON.parse(sessionStorage.getItem("spurtUser"));
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
    }
  };

  const getlikedStatus = (id) => {
    if (likeDislikeStream?.likedData?.length != 0) {
      if (likeDislikeStream?.likedData?.indexOf(id) > -1) {
        return "like flex flex-center justify-center liked";
      }
    } 
    if(likeDislikeStream?.dislikedData?.length != 0){
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

  return (
    <>
      {isLive ? (
        <>
          <div className="tme-wrap live flex flex-center justify-center">
            <span>1.2K</span> <button className="live"></button>
          </div>
          <button
            className={getlikedStatus(uuid)}
            id={uuid + "-btn"}
            onClick={() => handleLikeUnlike(uuid)}
          >
            <span><IconLike /></span>
          </button>
        </>
      ) : (
        <>
          <div className="tme-wrap flex flex-center justify-center">
            <span>Today {detail.scheduletime}</span>
          </div>
          <button
            className={getlikedStatus(uuid)}
            // className="like flex flex-center justify-center"
            onClick={() => handleLikeUnlike(uuid)}
          >
            <span><IconLike /></span>
          </button>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(LiveStreamStatus);
