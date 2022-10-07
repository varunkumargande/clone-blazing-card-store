import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import IconCategoryDrop from '../../Icons/IconCategoryDrop';
import IconLike from "../../Icons/IconLike"
import { connect } from 'react-redux';

function LiveScheduleCategory({ category, setLiveScheduleCategoryName, liveScheduleCategoryName, setActiveCategory, subCateId, setSubCateId }) {

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

    const handleActiveCategory = (name, index, id) => {
        setSubCateId(id)
        setLiveScheduleCategoryName(name)
        setActiveCategory(category["categories"][index])
    }

    const handleAllCate = () => {
        setSubCateId("select")
        setLiveScheduleCategoryName(null)
    }

    const getCategoryList = () => {
        if (Object.keys(category).length != 0) {
            return (
                <>
                    <div className="category-list">
                        <button className={liveScheduleCategoryName === null ? "title active" : "title"} onClick={handleAllCate}>All</button>
                    </div>
                    {category["categories"].map((res, index) => (
                        <>
                            <div className="category-list">
                                <button className={liveScheduleCategoryName === res.name ? "title active" : "title"} onClick={() => handleActiveCategory(res.name, index, res.categoryId)}>{res.name}</button>
                            </div>
                        </>
                    ))}
                </>
            )
        }
    }

    return (
        <section className="category-wrapper">
            <div className="inner-container">
                <div className="title-wrap flex space-between flex-center">
                    <div className="flex flex-center">
                        <section className="breadcrumbs-wrapper">
                            <ul className="breadcrumbs flex flex-center">
                                <li><a onClick={ () => window.location.href = "/"}> Home </a></li>/
                                <li className="current">{liveScheduleCategoryName == null ? "All" : liveScheduleCategoryName}</li>
                            </ul>
                        </section>
                        <div className="category-btn-wrap">
                            {/* <button className="category-btn flex flex-center justify-center" onClick={handleOnClick} ref={wrapperRef}><IconCategoryDrop /></button>
                            <ul className={active ? "dropDown active" : "dropDown"} >
                                <li className="active">Creator</li>
                                <li>Athelete</li>
                                <li>Artist</li>
                            </ul> */}
                        </div>
                    </div>
                    {/* <div className="seeAll"><Link href="/"><a className="flex flex-center">View All</a></Link></div> */}
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
        </section>
    );
}


const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(LiveScheduleCategory);