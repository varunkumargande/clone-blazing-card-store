import React,{useState,useEffect,useRef} from "react";
import Header from "../../components/partials/LandingPage/Header";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import IconEye from "../../components/Icons/IconEye";
import IconLike from "../../components/Icons/IconLike";
import IconDropdown from "../../components/Icons/IconDropdown";
import Footer from "../../components/partials/LandingPage/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { subcatstreamDetailApi } from "../../api/stream/subStreamDetail";


export default function categoryStream(){
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

    const [windowWidth, setWindowWidth] = useState(0);
    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
    };
  
    const dispatch = useDispatch();
    useEffect(()=>{
        subcatstreamDetailApi(dispatch)
    },[])
    const streamDetail= useSelector((state)=>state?.stream?.streamdetails?.stream)
    useEffect(() => {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    const getStreamCards = () => {
       
        return streamDetail?.scheduled?.map((detail) => {
          return (
            <div className="card-list flex flex-center">
                <div className="inner-card-list">
                    <a href={`/streaming?stream=${detail.id}&uuid=${detail.uuid}`}><div className="image">
                        <img src="/static/images/card.png" alt="Card" />
                        <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                        <button className="like flex flex-center justify-center"><IconLike /></button>
                    </div></a>
                    <div className="text">
                        <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> {detail.title}</h3>
                        <div className="disc">{detail.description}</div>
                        <button className="cate-btn">{detail.category_name}</button>
                    </div>
                </div>
            </div>
          );
        });
      };


    return(
        <div className="home-container">
            {windowWidth <= 1024 ? <MobileHeader/> : <HeaderDefault />}
            <section className="breadcrumbs-wrapper">
                <div className="inner-container">
                    <ul className="breadcrumbs flex flex-center">
                        <li>Home</li>/
                        <li className="current">Live</li>
                    </ul>
                </div>
            </section>
            <section className="category-wrapper">
                <div className="inner-container">
                    <div className="title-wrap flex space-between flex-center">
                        <div className="flex flex-center">
                            <h3 className="title">🔥Live</h3>
                        </div>
                    </div>
                </div>
                <div className="overflow-wrap">
                    <div className="Category-list-wrap inner-container flex">
                        <div className="category-like like">
                            <button className="Like flex justify-center flex-center"><span><IconLike /></span></button>
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
            </section>

            
            <div className="card-wrapper">
                <section className="Live-wrapper card-inner">
                    <div className="inner-container">
                        <div className="title-wrap flex space-between flex-center">
                            <div className="flex flex-center">
                                <h3 className="title">Cards - <span>20 Shows</span></h3>
                            </div>
                            {/* <div className="dropdownlist">
                                <button className="dropDownBtn flex flex-center space-between" onClick={handleOnClick} ref={wrapperRef}>PokemonCard <span><IconDropdown /></span></button>
                                <ul className= {active ? "jwelleryList active" : "jwelleryList"}>
                                    <li>PokemonCard</li>
                                    <li>JwellaryCard</li>
                                </ul>
                            </div> */}
                        </div>
                        <div className="overflow-none">
                            <div className="card-wrap flex inner-container">
                                {/*  */}
                                {getStreamCards()}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
           
            <Footer />
        </div>
    );
}