import React, { memo, useEffect, useState } from "react";

import StreamCardSkeleton from "../../../../skeleton/StreamCardSkeleton";

import { getCategoriesApi } from "../../../../api/home/categories";

import Styles from "../../../../modular_scss/InterestedCategories.module.scss";

function InterestedCategories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const result = getCategoriesApi("interested", setCategories);
  }, []);

  return (
    <section>
      <div className="inner-container title-wrap">
        <h3 className="title text-capitalize mb-4">Categories you follow</h3>
        <div>
          {categories?.data?.data?.map((datam) => (
            <button
              key={`${datam.category_id}-${datam?.type}-interested-home-page`}
              className={`btn text-capitalize ${Styles.category_btn} btn-outline-dark px-4 mr-3 mb-3`}
            >
              {datam.name}
            </button>
          ))}
        </div>
      </div>
      {/* <div className="overflow-wrap mb-5">
        <div className="flex inner-container">
          <div className="card-wrap flex">
            <StreamCardSkeleton count={7} name={"home-live-shows"} />
          </div>
        </div>
      </div> */}
    </section>
  );
}

export default memo(InterestedCategories);
