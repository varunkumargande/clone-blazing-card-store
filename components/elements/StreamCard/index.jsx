import React from "react";
import Link from "next/link";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
import IconLike from "../../Icons/IconLike"
import LiveStreamStatus from "../LiveStreamStatus";

export default function StreamCard({ detail, isLive }) {
    return (
        <div className="card-list flex flex-center">
            <a href={`/streaming?stream=${detail.id}&uuid=${detail.uuid}`}>
                <div className="image">
                    <img src="/static/images/card.png" alt="Card" />
                    <LiveStreamStatus isLive={isLive} />
                </div>
            </a>
            <div className="text">
                <h3 className="title flex flex-center">
                    <img src="/static/images/profile.png" alt="Card" />{" "}
                    {detail.title}
                </h3>
                <div className="disc">{detail.description}</div>
                {/* <button className="cate-btn">{stringFormatter(detail?.category_name)}</button> */}
            </div>
        </div>
    );
}
