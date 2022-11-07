import React from "react";
import IconLike from "../../../Icons/IconLike";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { stringFormatter } from "../../../../utilities/utils";
import Router from "next/router";
import StreamCard from "../../../elements/StreamCard";
import { useSelector } from "react-redux";
import { streamDetailApi } from "../../../../api/stream/streamDetail";
import ProfileMethods from "../../../../api/profile/ProfileMethods";
import StreamCardSkeleton from "../../../../skeleton/StreamCardSkeleton";

export default function LikedList({ setIsSeeAll, setSeeAllHeading }) {
  const streamDetail = useSelector(
    (state) => state?.stream?.streamdetails?.stream
  );

  const dislikedStreams = useSelector(
    (state) => state?.likeDislikeStream?.dislikedData
  );
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [likedShows, setLikedShows] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    const userData = JSON.parse(localStorage.getItem("blazingUser"));
    ProfileMethods.GetLikedStreams(userData?.id, setLikedShows, setLoader);
    setUserId(userData.id);
    setProfile(userData);
  }, []);

  const getStreamCards = () => {
    return likedShows?.map((detail) => {
      if (
        detail?.islike &&
        !dislikedStreams.find((streamId) => streamId === detail?.uuid)
      ) {
        return <StreamCard isLive={false} detail={detail} />;
      }
    });
  };

  return (
    <section className="Pokomon-wrapper card-inner">
      <div className="inner-container">
        <div className="title-wrap flex space-between flex-center">
          <div className="flex flex-center">
            <h3 className="title">Liked Shows</h3>
          </div>
        </div>
        <div className="overflow-none">
          <div className="card-wrap flex inner-container">
            {loader ? (
              <StreamCardSkeleton count={14} name={"home-live-shows"} />
            ) : (
              getStreamCards()
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
