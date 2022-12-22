import { memo } from "react"
import Styles from "./RatingCard.module.scss"
import moment from 'moment';
import Skeleton from "react-loading-skeleton";
import CloudinaryImage from "../CommonComponents/CloudinaryImage";
import { DefaultImagePath, ImageTransformation } from "../Constants/imageConstants";

const RatingCard = ({
    fullName,
    review,
    rating,
    date,
    imageUrl,
    ratingTypes = []
}) => {
    return (
        <div className={`${Styles.rating_card} my-4`}>
            <div className={Styles.head_section}>
                <div className={Styles.left_part}>
                    <div className={Styles.profile_img_container}>
                    <div className={`${Styles.profile_img} flex justify-content-center align-content-center`}>
                        {imageUrl ?
                            <CloudinaryImage
                                imageUrl={imageUrl}
                                keyId={imageUrl}
                                transformation={ImageTransformation.ProfileImage}
                                alternative="/static/images/profileImg.png"
                            />
                            :
                            <img height={16}
                                width={16}
                                src={DefaultImagePath.defaultProfileImage}
                                alt="ProfileImage" />
                        }
                        </div>
                    </div>
                    <div className={Styles.reviewer_name}>{fullName}</div>
                </div>
                <div className={Styles.right_part}>
                    <img src="/static/images/star.svg" alt="" />
                    <span className={Styles.number}>{rating}</span>
                </div>
            </div>
            <div className={Styles.date}>{moment(date).format('Do MMM YYYY')}</div>
            <div className={Styles.text_content}>
                {review}
            </div>
            <ul className={Styles.rating_list}>
                {ratingTypes?.map((ratingType, index) => {
                    return (
                        <li className={Styles.list} key={index}>
                            <span className={Styles.rating_type}>{ratingType?.name}</span>
                            <span className={Styles.rating}>
                                <img src="/static/images/star.svg" alt="" />
                                <span className={Styles.number}>{ratingType?.rating}</span>
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export const RatingCardSkeleton = () => {
    return (
        <div className={`${Styles.rating_card} my-4`}>
            <Skeleton height={80} />
            <Skeleton height={30} />
            <Skeleton height={20} count={3} />
        </div>
    )
}

export default memo(RatingCard);
