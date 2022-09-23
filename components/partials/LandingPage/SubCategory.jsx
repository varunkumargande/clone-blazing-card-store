import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import IconCategoryDrop from '../../Icons/IconCategoryDrop';
import IconLike from "../../Icons/IconLike"
import { connect } from 'react-redux';

function SubCategory({ subCateId, seeAllHeading, setSubCateId, category }) {

    const [active, setActive] = useState(false);
    const [categoryName, setCategoryName] = useState([]);
    const wrapperRef = useRef(null);
    const handleOnClick = () => {
        setActive(!active);
    };
    
    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setActive(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false)
        return () => {
            document.removeEventListener('click', handleClickOutside, false)
        }
    }, [])

    const getCategoryList = () => {
        if (Object.keys(category).length != 0) {
            return (
                <>
                    <div className="category-list">
                        <button className={subCateId === null ? "title active" : "title"} onClick={() => setSubCateId(null)}>All</button>
                    </div>
                    {category["categories"].map((res, index) => {
                        if (res.name == seeAllHeading) {
                            if (res.children.length != 0) {
                                return (
                                    <>
                                        {res.children.map((item, index2) => {
                                            return (
                                                <>
                                                    <div className="category-list">
                                                        <button className={subCateId === item.categoryId ? "title active" : "title"} onClick={() => setSubCateId(item.categoryId)}>{item.name}</button>
                                                    </div>
                                                </>
                                            )
                                        })}

                                    </>
                                )
                            }
                        }
                    })}
                </>
            )
        } else {
        }
    }

    return (
        <section className="category-wrapper">
            <div className="inner-container">
                <div className="title-wrap flex space-between flex-center">
                    <div className="flex flex-center">
                        <h3 className="title">{seeAllHeading}</h3>
                    </div>
                </div>
                <div className="overflow-wrap">
                    <div className="Category-list-wrap inner-container flex">
                        <div className="category-like like">
                            <button className="Like flex justify-center flex-center"><IconLike /></button>
                        </div>
                        {getCategoryList()}
                    </div>
                </div>
            </div>
        </section>
    );
}


const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(SubCategory);