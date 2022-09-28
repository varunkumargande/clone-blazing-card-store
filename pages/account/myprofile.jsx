import React,{useState,useEffect,useRef} from "react";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import IconLike from "../../components/Icons/IconLike";
import Footer from "../../components/partials/LandingPage/Footer";
import { useSelector,useDispatch } from "react-redux";
import { subcatstreamDetailApi } from "../../api/stream/subStreamDetail";
import HeaderDefault from '../../components/shared/headers/HeaderDefault';

// import all sub component from components/partials/account/myprofile
import ProfileBanner from "../../components/partials/account/myprofile/banner";
import ProfileCard from "../../components/partials/account/myprofile/profileCard";
import ProfileHeader from "../../components/partials/account/myprofile/profileHeader";
// ===================================================================

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
            </div>
          );
        });
      };

    return(
        <div className="home-container">
            {windowWidth <= 1024 ? <MobileHeader/> : <HeaderDefault />}
            <ProfileBanner />
            <div className="card-wrapper">
                <section className="Live-wrapper card-inner">
                    <div className="inner-container">
                        <div className="aside-content-wrap profile-wrapper flex flex-start space-between">
                           <ProfileCard />
                            <div className="overflow-none">
                                <ProfileHeader isSeller={false} />
                                <div className="card-wrap flex inner-container">
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