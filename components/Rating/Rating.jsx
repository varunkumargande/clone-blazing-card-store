import { useState, memo } from "react";
import IconStar from "../Icons/IconStar";

const Rating = ({ label, totalRating, handleOnRatingChange = () => { }, value = 0 }) => {
    const [ratingValue, setRatingValue] = useState(value);
    const [ratingHoverValue, setRatingHoverValue] = useState(0);
    const ratingIndexArray = new Array(totalRating).fill(0);

    /**
     * @method: handleRatingClick
     * @description: when clicked on rating: sets the rating value and return the value to parent component via callback.
     */
    const handleRatingClick = (ratingIndex) => {
        setRatingValue(ratingIndex + 1);
        handleOnRatingChange(ratingIndex + 1);
    }

    /**
     * @method: handleRatingMouseOver
     * @description: as method name, this function handles the rating when user hover over the stars/rating.
     */
    const handleRatingMouseOver = (ratingIndex) => {
        setRatingHoverValue(ratingIndex + 1);
    }
    /**
     * @method: handleRatingMouseOut
     * @description: as method name, this function handles the rating when user hover out the stars/rating. 
     */
    const handleRatingMouseOut = () => {
        setRatingHoverValue(0);
    }

    return (
        <div className="reviewBox flex space-between flex-center">
            <div className="label">{label}</div>
            <div className="review">
                {ratingIndexArray.map((_data, index) => (
                <span
                    key={index}
                    onMouseOver={(event) => { event.preventDefault(); handleRatingMouseOver(index); }}
                    onMouseOut={(event) => { event.preventDefault(); handleRatingMouseOut(); }}
                    onClick={(event) => { event.preventDefault(); handleRatingClick(index); }}
                    className={`${(index < ratingHoverValue || index < ratingValue) && "active"}`}
                >
                    <IconStar />
                </span>
            ))}
            </div>
        </div>
    );
}

export default memo(Rating);
