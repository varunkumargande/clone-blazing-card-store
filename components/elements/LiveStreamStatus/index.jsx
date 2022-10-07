import React, {useState} from "react";
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
        setLikedStream((state) => [...state, uuid]);
      }
    }
  };
  const getlikedStatus = (uuid) => {
    if (!!likedStream.includes(uuid) || detail.islike == 1) {
      return "like flex flex-center justify-center liked";
    }
    return "like flex flex-center justify-center";
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
            // className="like flex flex-center justify-center"
            onClick={() => handleLikeUnlike(uuid)}
          >
            <IconLike />
          </button>


        </>
      ) : (
        <>
          <div className="tme-wrap flex flex-center justify-center live">
            <span>1.2K</span> <button className="live"></button>
          </div>
        </>
      )}
    </>
  );
}
