import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import IconBack from "../../../Icons/IconBack";
import IconEye from "../../../Icons/IconEye";
import IconLike from "../../../Icons/IconLike"
import IconDropdown from "../../../../components/Icons/IconDropdown";
import StreamCard from "../../../elements/StreamCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { subcatstreamDetailApi } from "../../../../api/stream/subStreamDetail";


export default function     SeeAllList({ data, catId, seeAllHeading, subCateId, setSubCateId, liveScheduleCategoryName, activeCategory }) {
    const [active, setActive] = useState(false);
    const wrapperRef = useRef(null);
    const handleOnClick = () => {
        setActive(!active);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        subcatstreamDetailApi(dispatch, catId)
    }, [])
    const streamDetail = useSelector((state) => state?.stream?.streamdetails?.stream)

    const handleSubCateId = (e) => {
        setSubCateId(e.target.value)
    }

    const handleCardDetail = () => {

        if (seeAllHeading == "Live") {
            return streamDetail?.live?.map((detail) => {
                return (
                    <StreamCard detail={detail} isLive={true} />
                );
            });
        } else if (seeAllHeading == "Scheduled") {
            return streamDetail?.scheduled?.map((detail) => {

                if (subCateId != "select") {
                    if (parseInt(subCateId) === parseInt(detail.category_id)) {
                        return (
                            <StreamCard detail={detail} isLive={true}  />
                        );
                    }
                } else {
                    if (liveScheduleCategoryName === detail.category_name) {
                        return (
                            <StreamCard detail={detail} isLive={true} />
                        );
                    }
                    if (liveScheduleCategoryName == null) {
                        return (
                            <StreamCard detail={detail} isLive={true} />
                        );
                    }
                }
            });
        } else {
            if (data[seeAllHeading] != undefined) {
                return data[seeAllHeading].map((detail, index) => {
                    if (subCateId == null || subCateId == "select") {
                        return (
                            <StreamCard detail={detail} isLive={true} />
                        )
                    } else {
                        if (parseInt(subCateId) == detail.subCategory_id) {
                            return (
                                <StreamCard detail={detail} isLive={true} />
                            )
                        }
                    }
                })
            }
        }
    }

    return (
        <section className="Pokomon-wrapper card-inner">
            <div className="inner-container">
                <div className="title-wrap flex space-between flex-center">
                    <div className="flex flex-center">
                        <h3 className="title">{seeAllHeading}</h3>
                    </div>
                    {liveScheduleCategoryName == null ? (
                        <>
                        </>
                    ) : (
                        <>
                            <div className="seeAll">
                                <div className="dropdownlist">
                                    <select className="dropDownBtn flex flex-center space-between" onChange={(e) => setSubCateId(e.target.value)}>
                                        <option value={"select"}>
                                            Sub_Category
                                        </option>
                                        {activeCategory.children.map((item, index) => {
                                            return (
                                                <>
                                                    <option value={item.categoryId}>
                                                        {item.name}
                                                    </option>
                                                </>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="overflow-none">
                    <div className="card-wrap flex inner-container">
                        {handleCardDetail()}
                    </div>
                </div>

            </div>
        </section>
    );
}

