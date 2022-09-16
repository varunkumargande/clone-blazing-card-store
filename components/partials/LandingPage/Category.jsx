import React,{useState,useEffect,useRef} from "react";
import Link from "next/link";
import IconCategoryDrop from '../../Icons/IconCategoryDrop';
import IconLike from "../../Icons/IconLike"
export default function Category(){
    const [active, setActive] = useState(false);
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
    

    return(
        <section className="category-wrapper">
            <div className="inner-container">
                <div className="title-wrap flex space-between flex-center">
                    <div className="flex flex-center">
                        <h3 className="title">Categories</h3>
                        <div className="category-btn-wrap">
                            <button className="category-btn flex flex-center justify-center" onClick={handleOnClick} ref={wrapperRef}><IconCategoryDrop /></button>
                            <ul  className= {active ? "dropDown active" : "dropDown"} >
                                <li className="active">Creator</li>
                                <li>Athelete</li>
                                <li>Artist</li>
                            </ul>
                        </div>
                    </div>
                    <div className="seeAll"><Link href="/"><a className="flex flex-center">See All</a></Link></div>
                </div>
                <div className="overflow-wrap">
                    <div className="Category-list-wrap inner-container flex">
                        <div className="category-like like">
                            <button className="Like flex justify-center flex-center"><IconLike /></button>
                        </div>
                        <div className="category-list">
                            <button className="title active">Cards</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Explore</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Watches</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Music</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Jewellery</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Sneakers</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Cards</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Explore</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Watches</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Music</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Jewellery</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Sneakers</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Cards</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Explore</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Watches</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Music</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Jewellery</button>
                        </div>
                        <div className="category-list">
                            <button className="title">Sneakers</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}