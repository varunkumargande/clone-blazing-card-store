import React from "react";
import Link from "next/link";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
import IconLike from "../../Icons/IconLike";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { subcatstreamDetailApi } from "../../../api/stream/subStreamDetail";
<<<<<<< HEAD
import { stringFormatter } from "../../../utilities/utils";
=======
export default function Electronic({name}){
>>>>>>> pre-dev

export default function Electronic({categoryData}) {
  const dispatch = useDispatch();
  useEffect(() => {
    subcatstreamDetailApi(dispatch);
  }, []);
  const getStreamCards = () => {
    if (categoryData) {
    
<<<<<<< HEAD
      return categoryData[1]?.map((detail) => {
        return (
          <div className="card-list flex flex-center">
            <a href={`/streaming/?stream=${detail.id}&uuid=${detail.uuid}`}>
              <div className="image">
                <img src="/static/images/card.png" alt="Card" />
                <div className="tme-wrap flex flex-center justify-center">
                  <IconEye />
                  <span>1.2K</span> <button className="live">Live</button>
                </div>
                <button className="like flex flex-center justify-center">
                  <IconLike />
                </button>
              </div>
            </a>
=======
   
    const dispatch = useDispatch();
    useEffect(()=>{
        subcatstreamDetailApi(dispatch)
    },[])
    const streamDetail= useSelector((state)=>state?.stream?.streamdetails?.category)
    console.log(Object.entries(streamDetail))


    const getStreamCards = () => {
       
        return streamDetail?.ELECTRONICS?.map((detail) => {
          return (
            <div className="card-list flex flex-center">
           <a href={`/streaming?stream=${detail.id}&uuid=${detail.uuid}`}><div className="image">
                <img src="/static/images/card.png" alt="Card" />
                <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                <button className="like flex flex-center justify-center"><IconLike /></button>
            </div></a> 
>>>>>>> pre-dev
            <div className="text">
              <h3 className="title flex flex-center">
                <img src="/static/images/profile.png" alt="Card" />{" "}
                {detail.title}
              </h3>
              <div className="disc">{detail.description}</div>
              <button className="cate-btn">{stringFormatter(detail?.category_name)}</button>
            </div>
          </div>
        );
      });
    }
  };

<<<<<<< HEAD
  return (
    <section className="Live-wrapper card-inner">
      <div className="inner-container">
        <div className="title-wrap flex space-between flex-center">
          <div className="flex flex-center">
            <h3 className="title">{stringFormatter(categoryData[0])}</h3>
          </div>
          <div className="seeAll">
            <Link href={`/categoryStream?catname=${categoryData[0]}`}>
              <a className="flex flex-center">See All</a>
            </Link>
          </div>
        </div>
        <div className="overflow-wrap">
          <div className="card-wrap flex inner-container">
            {/*  */}
            {getStreamCards()}
          </div>
        </div>
      </div>
    </section>
  );
}
=======
    return(
        <section className="Live-wrapper card-inner">
            <div className="inner-container">
                <div className="title-wrap flex space-between flex-center">
                    <div className="flex flex-center">
                        <h3 className="title">Electronics</h3>
                    </div>
                    <div className="seeAll"><Link href={`/categoryStream?catname=${name}`}><a className="flex flex-center">See All</a></Link></div>
                </div>
                <div className="overflow-wrap">
                    <div className="card-wrap flex inner-container">
                     {/*  */}
                     {getStreamCards()}
                    </div>
                </div>
            </div>
        </section>
    );
}
>>>>>>> pre-dev
