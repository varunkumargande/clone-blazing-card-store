import { limit } from "../Constants";

const ShowViewAll = (detail, handleGoToSeeAll) => {
  return (
    detail > limit && (
      <div className="seeAll">
        <a
          className="flex flex-center"
          onClick={(e) => {
            e.preventDefault();
            handleGoToSeeAll(e);
          }}
        >
          View All
        </a>
      </div>
    )
  );
};

export default ShowViewAll;
