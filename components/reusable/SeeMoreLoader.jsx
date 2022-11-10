import IconLoader from "../Icons/IconLoader";
import IconLoaderPlay from "../Icons/IconLoaderPlay";
import { limit } from "../Constants";

const SeeMoreLoader = ({ setOffset, offset }) => {
  const handleCallApi = () => {
    const pageAdd = offset + limit;
    setOffset(pageAdd);
  };

  return (
    <div className="flex flex-center">
      <button className="seeAll" onClick={handleCallApi}>
        See More
      </button>
    </div>
  );
};

export default SeeMoreLoader;
