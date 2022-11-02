import { limit } from "../Constants";

const ShowViewAll = ({ data, handleSeeAll, catName }) => {
  return (
    data?.length > limit && (
      <div className="seeAll">
        <a
          className="flex flex-center"
          onClick={() => handleSeeAll(catName)}
        >
          View All
        </a>
      </div>
    )
  );
};

export default ShowViewAll;
