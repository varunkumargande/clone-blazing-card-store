import React,{useState,useEffect} from "react";
import Header from "../../components/partials/LandingPage/Header";
import MobileHeader from "../../components/partials/LandingPage/MobileHeader";
import Category from "../../components/partials/LandingPage/Category";
import IconEye from "../../components/Icons/IconEye";
import IconLike from "../../components/Icons/IconLike";
import Footer from "../../components/partials/LandingPage/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { subcatstreamDetailApi } from "../../api/stream/subStreamDetail";



export default function categoryStream(){
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
                <div className="tme-wrap flex flex-center justify-center"><IconEye /><span>1.2K</span> <button className="live">Live</button></div>
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
            <Category />
            <div className="card-wrapper">
            <section className="Live-wrapper card-inner">
            <div className="inner-container">
                <div className="title-wrap flex space-between flex-center">
                    <div className="flex flex-center">
                        <h3 className="title"></h3>
                    </div>
                    <div className="seeAll"></div>
                </div>
                <div className="overflow-wrap">
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