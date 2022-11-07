import { limit } from "../Constants";

const ShowViewAll = ({ handleGoToSeeAll, catName, dataLen }) => {
  const showAllViewDiv = () => {
    if (dataLen >= limit) {
      return (
        <a
          className="flex flex-center"
          onClick={(e) => {
            e.preventDefault();
            handleGoToSeeAll(catName);
          }}
        >
          View All
        </a>
      );
    }
  };

  return <div className="seeAll">{showAllViewDiv()}</div>;
};

export default ShowViewAll;
