import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import IconCategoryDrop from '../../Icons/IconCategoryDrop';
import IconLike from "../../Icons/IconLike"
import { connect } from 'react-redux';

function Category({ isSeeAllCate, isSeeAll, subCateId, seeAllHeading, setSubCateId, category, setActiveCategoryName, activeCategoryName, activeCategoryIndex, setActiveCategoryIndex, activeCategory, setActiveCategory }) {

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

    const handleActiveCategory = (index, name, id) => {
        setActiveCategoryIndex(index)
        setActiveCategoryName(name)
        setActiveCategory(category["categories"][index])
        setSubCateId(id)
    }

    const handleAllCate = () => {
        setSubCateId("select")
        setActiveCategoryIndex(null)
    }

    console.log(activeCategoryIndex)

    const getCategoryList = () => {
        if (isSeeAll == true) {
            if (Object.keys(category).length != 0) {
                return (
                    <>
                        <div className="category-list">
                            <button className={activeCategoryIndex === null ? "title active" : "title"} onClick={handleAllCate}>All</button>
                        </div>
                        {category["categories"].map((res, index) => {
                            if (res.name === seeAllHeading) {
                                if (res.length != 0) {
                                    return (
                                        <>
                                            {res?.children?.map((item, index2) => {
                                                return (
                                                    <>
                                                        <div className="category-list">
                                                            <button className={activeCategoryIndex === index2 ? "title active" : "title"} onClick={() => handleActiveCategory(index2, item.name, item.categoryId)}>{item.name}</button>
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
            }
        } else {
            if (Object.keys(category).length != 0) {
                return (
                    <>
                        <div className="category-list">
                            <button className={activeCategoryIndex === null ? "title active" : "title"} onClick={() => setActiveCategoryIndex(null)}>All</button>
                        </div>
                        {category["categories"].map((res, index) => (
                            <>
                                <div className="category-list">
                                    <button className={activeCategoryIndex === index ? "title active" : "title"} onClick={() => handleActiveCategory(index, res.name, res.categoryId)}>{res.name}</button>
                                </div>
                            </>
                        ))}
                    </>
                )
            }
        }

    }

    return (
        <section className="category-wrapper">
            <div className="inner-container">
                <div className="title-wrap flex space-between flex-center">
                    <div className="flex flex-center">
                        <h3 className="title"> <a onClick={() => window.location.href="/"} className="title active"> Home / </a> {activeCategoryIndex == null ? "All" : activeCategoryName}</h3>
                        <div className="category-btn-wrap">
                            {/* <button className="category-btn flex flex-center justify-center" onClick={handleOnClick} ref={wrapperRef}><IconCategoryDrop /></button>
                            <ul className={active ? "dropDown active" : "dropDown"} >
                                <li className="active">Creator</li>
                                <li>Athelete</li>
                                <li>Artist</li>
                            </ul> */}
                        </div>
                    </div>
                    {/* <div className="seeAll"><Link href="/"><a className="flex flex-center">See All</a></Link></div> */}
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

export default connect(mapStateToProps)(Category);