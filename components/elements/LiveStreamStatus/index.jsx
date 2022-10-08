import React, { useState } from "react";
import Link from "next/link";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
import IconLike from "../../Icons/IconLike";
import { streamLikeDislike } from "../../../api/stream/streams_api";
import { useEffect } from "react";

export default function LiveStreamStatus({ isLive, uuid, detail }) {
  const [likedStream, setLikedStream] = useState([]);

  useEffect(() => {
    if (!!detail?.islike) {
      setLikedStream((state) => [...state, detail.uuid]);
    }
  }, [])

  const handleLikeUnlike = async (uuid) => {
    const userDetails = JSON.parse(sessionStorage.getItem("spurtUser"));
    if (uuid && !!userDetails) {
      const data = {
        stream_id: uuid,
        user_id: userDetails?.id,
      };
      const response = await streamLikeDislike(data);
      if (response.status) {
        if (response?.data?.is_like) {
          setLikedStream((state) => [...state, uuid]);
        } else {
          var index = likedStream.indexOf(uuid);
          if (index > -1) {
            likedStream.splice(index, 1);
          }
          getlikedStatus(uuid)
        }
      }
    }
  };
  const getlikedStatus = (id) => {

    console.log(likedStream.indexOf(id), id)

    if(likedStream.indexOf(id) > -1) {
      // console.log(likedStream.indexOf(id), id)
      return "like flex flex-center justify-center liked";
    } else {
      // console.log(likedStream.indexOf(id))
      return "like flex flex-center justify-center";
    }

    // if (detail.islike == 1 || likedStream.indexOf(uuid) > -1) {
    //   return "like flex flex-center justify-center liked";
    // } else {
    //   return "like flex flex-center justify-center";
    // }
    
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
            id={uuid+"-btn"}
            onClick={() => handleLikeUnlike(uuid)}
          >
            <IconLike />
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
            <IconLike />
          </button>
        </>
      )}
    </>
  );
}
