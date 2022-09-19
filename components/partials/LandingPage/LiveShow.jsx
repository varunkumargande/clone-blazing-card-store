import Link from "next/link";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
import IconLike from "../../Icons/IconLike"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { streamDetailApi } from "../../../api/stream/streamDetail";
import { subcatstreamDetailApi } from "../../../api/stream/subStreamDetail";
export default function LiveShow({name,catId}){

    
   
    const dispatch = useDispatch();
    useEffect(()=>{
        subcatstreamDetailApi(dispatch,catId)
    },[])
    const streamDetail= useSelector((state)=>state?.stream?.streamdetails?.stream)
    console.log("stream detail",streamDetail)
//    if(!!streamDetail?.category)console.log(Object.keys( streamDetail?.category))

    const getStreamCards = () => {
       
        return streamDetail?.scheduled?.map((detail) => {
          return (
            <div className="card-list flex flex-center">
            <a href={`/streaming/?stream=${detail.id}&uuid=${detail.uuid}`}><div className="image">
                <img src="/static/images/card.png" alt="Card" />

                <button className="like flex flex-center justify-center"><IconLike /></button>
            </div></a>
            <div className="text">
                <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> {detail.title},{catId}</h3>
                <div className="disc">{detail.description}</div>
                <button className="cate-btn">{detail.category_name}</button>
            </div>
        </div>
          );
        });
      };

    return(
        <section className="Live-wrapper card-inner">
            <div className="inner-container">
                <div className="title-wrap flex space-between flex-center">
                    <div className="flex flex-center">
                        <h3 className="title">Live</h3>
                    </div>
                    <div className="seeAll"><Link href="/categoryStream?catname=live"><a className="flex flex-center">See All</a></Link></div>
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