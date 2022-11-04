import { limit } from "../Constants";

const ShowViewAll = ({ handleGoToSeeAll, catName, dataLen }) => {
  return (
    <div className="seeAll">
      {dataLen === limit && (
        <a
          className="flex flex-center"
          onClick={(e) => {
            e.preventDefault();
            handleGoToSeeAll(catName);
          }}
        >
          View All
        </a>
      )}
    </div>
  );
};

export default ShowViewAll;
