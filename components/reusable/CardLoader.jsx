import IconLoader from "../Icons/IconLoader";
import IconLoaderPlay from "../Icons/IconLoaderPlay";
import { limit } from "../Constants";

const CardLoader = ({ setPage, page, isCat, catId, setCatId }) => {
  const handleCallApi = () => {
    const pageAdd = page + limit;
    setPage(pageAdd);
    if (isCat) {
      setCatId(catId);
    }
  };

  return (
    <div className="card-list flex flex-center" onClick={handleCallApi}>
      <div className="inner-card-list Loader">
        <div className="image flex flex-center justify-center column">
          <div className="LoaderImg">
            <div className="loader-icon">
              <IconLoader />
            </div>
            <span>
              <IconLoaderPlay />
            </span>
          </div>
          <div className="loading">Load More</div>
        </div>
        <div className="text">
          <div className="title"></div>
          <div className="disc"></div>
          <div className="disc"></div>
          <div className="cate"></div>
        </div>
      </div>
    </div>
  );
};

export default CardLoader;
