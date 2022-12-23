import React, { memo, useEffect, useState, useMemo } from "react";

import { getInterestsApi } from "../../../../api/home/categories";
import ShowSectionCards from "./ShowSectionCards";

function NormalCategories({ showLoginModal }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getInterestsApi("normal", setCategories);
  }, []);

  return (
    <section>
      {categories?.data?.data?.map((datum) => (
        <ShowSectionCards
          showLoginModal={showLoginModal}
          key={`${datum.categoryId}-${datum?.type}-interested-home-category`}
          section={datum}
        />
      ))}
    </section>
  );
}

export default memo(NormalCategories);
