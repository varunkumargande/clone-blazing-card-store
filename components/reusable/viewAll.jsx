import { limit } from "../Constants";

const ShowViewAll = ({ data, handleGoToSeeAll, catName }) => {
  return (
    <div className="seeAll">
        <a
          className="flex flex-center"
          onClick={handleGoToSeeAll}
        >
          View All
        </a>
      </div>
    // data?.length > limit && (
      
    // )
  );
};

export default ShowViewAll;
