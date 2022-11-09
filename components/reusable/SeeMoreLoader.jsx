import IconLoader from "../Icons/IconLoader";
import IconLoaderPlay from "../Icons/IconLoaderPlay";
import { limit } from "../Constants";

const SeeMoreLoader = ({ setOffset, offset }) => {
  const handleCallApi = () => {
    const pageAdd = offset + limit;
    setOffset(pageAdd);
  };

  return (
    <div className="viewMore flex flex-center justify-center w500">
      <button className="title blue" onClick={handleCallApi}>
        View More
      </button>
    </div>
  );
};

export default SeeMoreLoader;
