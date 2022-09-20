import React,{useState,useEffect,useRef} from "react";
import Header from "../../components/partials/LandingPage/Header";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import IconLike from "../../components/Icons/IconLike";
import Footer from "../../components/partials/LandingPage/Footer";
import IconShareFacebook from "../../components/Icons/IconShareFacebook"
import IconShareTwitter from "../../components/Icons/IconShareTwitter";
import IconShareWhatsup from "../../components/Icons/IconShareWhatsup";
import { useSelector,useDispatch } from "react-redux";
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
                <a href={`/streaming/?stream=${detail.id}&uuid=${detail.uuid}`}><div className="image">
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
          );
        });
      };


    return(
        <div className="home-container">
            {windowWidth <= 1024 ? <MobileHeader/> : <Header />}
            <section className="category-banner">
                <img src="/static/images/cover.png" alt="cover" />
                <div className="cover-wrap flex justify-right"><button className="border-btn cover-btn">Edit Cover Photo</button></div>
            </section>
            <div className="card-wrapper">
                <section className="Live-wrapper card-inner">
                    <div className="inner-container">
                        <div className="aside-content-wrap profile-wrapper flex flex-start space-between">
                            <aside className="aside-wrapper profile-aside">
                                <div className="aside-container profile-container">
                                <div className="profile-icon">
                                <img src="/static/images/profile-large.svg" alt="profileImg" />
                                </div>
                                <div className="title flex column">
                                    Alejandro Felix Bronco
                                  <span>@felix.bronco</span>
                                </div>
                                {/* <button className="primary-btn follow-btn">Follow</button> */}
                                <button className="border-btn edit-profile-btn">Edit Profile</button>
                                <p className="description">
                                Add our new 'Hire Me' section to your profile to let
                                 visitors know that you're looking for new opportunities.
                                  Add our new 'Hire Me' section to your profile to let visitors
                                   know that you're looking.
                                </p>
                                <div className="social-icons-wrapper">
                                    <div className="social-border"></div>
                                   <ul className="social-icons flex">
                                     <li><IconShareFacebook/></li>
                                    <li><IconShareTwitter /></li>
                                    <li> <IconShareWhatsup /></li>
                                   </ul>
                                </div>
                                </div>
                            </aside>
                            <div className="overflow-none">
                                <section className="category-wrapper cotegories-border">
                                    <div className="overflow-wrap">
                                        <div className="Category-list-wrap inner-container flex">
                                            <div className="category-list">
                                                <button className="title active">Upcoming Shows(8)</button>
                                            </div>
                                            <div className="category-list">
                                                <button className="title">Previous Shows(2)</button>
                                            </div>
                                            <div className="category-list">
                                                <button className="title">Followers(128K)</button>
                                            </div>
                                            <div className="category-list">
                                                <button className="title">Following (62)</button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <div className="card-wrap flex mt35 inner-container">
                                    {/*  */}
                                    {getStreamCards()}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
           
            <Footer />
        </div>
    );
}