import React from "react";

import Skeleton from "react-loading-skeleton";
import IconLike from "../../components/Icons/IconLike";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";

const TabsSkeleton = ({ count = 1, name = "" }) => {
  const { isMobile } = useIsMobile();
  const data = new Array(count).fill(0);
  return data.map((_item, index) => (
    <div key={`${index}-${count}-${name}`} className="category-list">
      <button className={"title"}>
        <Skeleton
          baseColor="#dddbdb66"
          highlightColor={"#cdcccc"}
          width={isMobile ? 50 : 170}
        />
      </button>
    </div>
  ));
};

export default TabsSkeleton;
