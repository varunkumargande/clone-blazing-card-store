import Link from "next/link";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
import IconLike from "../../Icons/IconLike"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { streamDetailApi } from "../../../api/stream/streamDetail";
import { subcatstreamDetailApi } from "../../../api/stream/subStreamDetail";
import StreamCard from "../../elements/StreamCard";

export default function LiveShow({ name, catId, setIsSeeAll, setSeeAllHeading, setIsLiveScheduleSeeAll }) {

  const handleSeeAll = (name) => {
    setIsSeeAll(true)
    setIsLiveScheduleSeeAll(true)
    setSeeAllHeading(name)
  }    
   
    const dispatch = useDispatch();
    useEffect(()=>{
        subcatstreamDetailApi(dispatch,catId)
    },[])
    const streamDetail= useSelector((state)=>state?.stream?.streamdetails?.stream)

  const getStreamCards = () => {
    return streamDetail?.scheduled?.map((detail) => {
      return (
        <>
          <StreamCard detail={detail} isLive={true} />
        </>
      );
    });
  };

  return (
    <>
      {streamDetail?.live?.length == 0 ? "" : (
        <>
          <section className="Live-wrapper card-inner">
            <div className="inner-container">
              <div className="title-wrap flex space-between flex-center">
                <div className="flex flex-center">
                  <h3 className="title">Live</h3>
                </div>
                <div className="seeAll">
                  <a className="flex flex-center" onClick={() => handleSeeAll("Live")}>View All</a>
                </div>
              </div>
            </div>
            <div className="overflow-wrap">
              <div className="flex inner-container">
                <div className="card-wrap flex">
                {/*  */}
                  {getStreamCards()}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

    </>
  );
}
