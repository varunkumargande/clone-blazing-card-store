import React from "react";
import Link from "next/link";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
import IconLike from "../../Icons/IconLike"

export default function LiveStreamStatus({ isLive }) {
    return (
        <>
            {isLive ? (
                <>
                    <div className="tme-wrap flex flex-center justify-center">
                        <IconEye />
                        <span>1.2K</span> <button className="live">Live</button>
                    </div>
                    <button className="like flex flex-center justify-center">
                        <IconLike />
                    </button>
                </>
            ) : (
                <>
                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                </>
            )}

        </>
    );
}
