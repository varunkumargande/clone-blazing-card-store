import React, { useState, useEffect, useRef } from "react";

export default function ProfileHeader({isSeller}) {


    const [profileBar, setProfileBar] = useState([
        {
            'id':0,
            'name':"Likes Shows"
        },
        {
            'id':1,
            'name':"Followers"
        },
        {
            'id':2,
            'name':"Following"
        },
    ])

    const [sellerBar, setSellerBar] = useState([
        {
            'id':0,
            'name':"Upcoming Shows"
        },
        {
            'id':1,
            'name':"Previous Shows"
        },
        {
            'id':2,
            'name':"Followers"
        },
        {
            'id':3,
            'name':"Following"
        },
    ])

    const handleBarList = () => {
        if(isSeller){
            return(
                <>
                    
                </>
            )
        }
    }

    return (
        <>
            <section className="category-wrapper cotegories-border mb35">
                <div className="overflow-wrap">
                    <div className="Category-list-wrap inner-container flex">
                        
                        {/* <div className="category-list">
                            <button className="title active">Upcoming Shows(8)</button>
                        </div> */}

                        <div className="category-list">
                            <button className="title active">Likes Shows(2)</button>
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
        </>
    );
}