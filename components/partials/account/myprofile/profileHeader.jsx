import React, { useState, useEffect, useRef } from "react";

export default function ProfileHeader({
  isSeller,
  activeTab,
  setActiveTab,
  sellerBar,
  setSellerBar,
  profileBar,
  setProfileBar,
}) {
  useEffect(() => {
    if (isSeller) {
      setActiveTab({ type: "seller", slug: "UPCOMING" });
    } else {
      setActiveTab({ type: "buyer", slug: "LIKES" });
    }
  }, []);

  return (
    <>
      <section className="category-wrapper cotegories-border mb35">
        <div className="overflow-wrap">
          <div className="Category-list-wrap inner-container flex">
            {/* {handleBarList()} */}
          </div>
        </div>
      </section>
    </>
  );
}
