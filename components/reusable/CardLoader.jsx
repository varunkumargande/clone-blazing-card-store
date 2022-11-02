import IconLoader from "../Icons/IconLoader";
import IconLoaderPlay from "../Icons/IconLoaderPlay";
import { useDispatch } from "react-redux";
import { limit } from "../Constants";

const CardLoader = ({setPage, page}) => {
  const dispatch = useDispatch()

  const handleCallApi = () => {
    const pageAdd = page + limit
    setPage(pageAdd)
  }

  return (
    <div className="card-list flex flex-center" onClick={handleCallApi}>
      <div class="inner-card-list Loader">
        <div className="image flex flex-center justify-center column">
          <div className="LoaderImg">
            <div className="loader-icon">
              <IconLoader />
            </div>
            <span>
              <IconLoaderPlay />
            </span>
          </div>
          <div className="loading">Load All</div>
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