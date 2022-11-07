import React from "react";

import Skeleton from "react-loading-skeleton";
import IconLike from "../../components/Icons/IconLike";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";

const StreamLoadSkeleton = ({ count = 1, name = "" }) => {
  const { isMobile } = useIsMobile();
  const data = new Array(count).fill(0);
  return data.map((_item, index) => (
    <div
      key={`${index}-${count}-${name}`}
      className="card-list flex flex-center"
    >
      <div className="inner-card-list">
        <div className="image">
          <Skeleton
            borderRadius={8}
            width={`100%`}
            height={isMobile ? 216 : 263}
            zIndex={0}
          />
          <div className="position-absolute top-left-4">
            <Skeleton
              className="tme-wrap flex flex-center justify-center"
              baseColor="#dddbdb66"
              highlightColor="#cdcccc"
            />
          </div>
          <button className={`like flex flex-center justify-center`}>
            <span>
              <IconLike />
            </span>
          </button>
        </div>
        <div className="text" style={{ height: isMobile ? `104px` : `40px` }}>
          <h5 className="title position-absolute">
            <Skeleton
              className="skeleton-profile-img"
              circle
              baseColor="#dddbdb66"
              highlightColor="#cdcccc"
            />
          </h5>
          <Skeleton
            width="100%"
            baseColor="#dddbdb66"
            highlightColor="#cdcccc"
          />
          <div className="disc">
            <Skeleton
              width="100%"
              baseColor="#dddbdb66"
              highlightColor="#cdcccc"
            />
          </div>
          <Skeleton
            className="cate-btn"
            baseColor="#1877f233"
            highlightColor="#96c7ff"
            width="90px"
          />
        </div>
      </div>
    </div>
  ));
};

export default StreamLoadSkeleton;
