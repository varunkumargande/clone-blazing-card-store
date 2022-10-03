import React, { useState } from "react";
import Link from "next/link";
import IconBack from "../../../Icons/IconBack";
import IconEye from "../../../Icons/IconEye";
import IconLike from "../../../Icons/IconLike"
import StreamCard from "../../../elements/StreamCard";

export default function Vertical({ setIsSeeAllCate, categoryName, data, activeCategory, subCateId, setSubCateId }) {

    const handleSubCateId = (e) => {
        setSubCateId(e.target.value)
    }

    const handleCardDetail = () => {
        if (data[categoryName] != undefined) {
            return data[categoryName].map((detail, index) => {
                if (subCateId == "select" || subCateId == null) {
                    return (
                        <StreamCard detail={detail} isLive={true} />
                    )
                } else {
                    if (parseInt(subCateId) === detail.category_id) {
                        return (
                            <StreamCard detail={detail} isLive={true} />
                        )
                    }

                    if (parseInt(subCateId) === detail.subCategory_id) {
                        return (
                            <StreamCard detail={detail} isLive={true} />
                        )
                    }
                }
            })
        }
    }

    return (
        <section className="Pokomon-wrapper card-inner">
            <div className="inner-container">
                <div className="title-wrap flex space-between flex-center">
                    <div className="flex flex-center">
                        <h3 className="title">{categoryName == null ? "All" : categoryName}</h3>
                    </div>
                    <div className="seeAll">
                        <div className="dropdownlist">
                            <select className="dropDownBtn flex flex-center space-between" onChange={(e) => handleSubCateId(e)}>
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

