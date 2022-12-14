import { memo } from "react"
import IconStar from "../Icons/IconStar";
import Styles from "./RatingCard.module.scss"

const RatingCard = () => {

    return (
        <div className={Styles.rating_card}>
            <div className={Styles.head_section}>
                <div className={Styles.left_part}>
                    <div className={Styles.profile_icon}> <img src="/static/images/profile-icon-rating.svg" alt="" /> </div>
                    <div>John Doe</div>
                </div>
                <div className={Styles.right_part}>
                    <img src="/static/images/star.svg" alt="" />
                    <span className={Styles.number}>5</span>
                </div>
            </div>
            <div className={Styles.date}> 9th Feb 2022</div>
            <div className={Styles.text_content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing et massa rhoncus faucibus feugiat non neque dolor.
            </div>
            <ul className={Styles.rating_list}>
                <li className={Styles.list}><span>Shipping</span> <span className={Styles.rating}> <img src="/static/images/star.svg" alt="" />
                    <span className={Styles.number}>5</span></span></li>
                <li className={Styles.list}><span>Packaging</span> <span className={Styles.rating}> <img src="/static/images/star.svg" alt="" />
                    <span className={Styles.number}>5</span></span></li>
                <li className={Styles.list}><span>Accuracy</span> <span className={Styles.rating}> <img src="/static/images/star.svg" alt="" />
                    <span className={Styles.number}>5</span></span></li>
            </ul>

        </div>
    );
}

export default memo(RatingCard);
