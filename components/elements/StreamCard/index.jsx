import React from "react";
import Link from "next/link";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
import IconLike from "../../Icons/IconLike";
import LiveStreamStatus from "../LiveStreamStatus";
import { stringFormatter } from "../../../utilities/utils";
import Router from "next/router";

export default function StreamCard({ detail, isLive }) {
  
  const handleRouting = (id) => {
    Router.push("/profile/" + id);
  };

  const handleStreamingLink = (detail) => {
    Router.push(`/streaming?stream=${detail.id}&uuid=${detail.uuid}`);
  }

  return (
    <div className="card-list flex flex-center">
      <div class="inner-card-list">
        
        {/* <Link href={`/streaming?stream=${detail.id}&uuid=${detail.uuid}`}> */}
          <div className="image">
            <img src="/static/images/card.png" alt="Card" onClick={() => handleStreamingLink(detail)} />
            <LiveStreamStatus isLive={isLive} uuid={detail.uuid} />
          </div>
        {/* </Link> */}
        
        <div className="text">
          <h3
            className="title flex flex-center"
            onClick={() => handleRouting(detail.id)}
          >
            <img src="/static/images/profile.png" alt="Card" />{" "}
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
