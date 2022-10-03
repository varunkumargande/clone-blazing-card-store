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

  const handleBarList = () => {
    if (isSeller) {
      return (
        <>
          {sellerBar.map((item, index) => {
            return (
              <>
                <div className="category-list">
                  <button
                    onClick={() =>
                      setActiveTab({ type: "seller", slug: item.slug })
                    }
                    className={
                      activeTab.type == "seller" && activeTab.slug == item.slug
                        ? "title active"
                        : "title"
                    }
                  >
                    {item.name}
                  </button>
                </div>
              </>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {profileBar.map((item, index) => {
            return (
              <>
                <div className="category-list">
                  <button
                    onClick={() =>
                      setActiveTab({ type: "buyer", slug: item.slug })
                    }
                    className={
                      activeTab.type == "buyer" && activeTab.slug == item.slug
                        ? "title active"
                        : "title"
                    }
                  >
                    {item.name}
                  </button>
                </div>
              </>
            );
          })}
        </>
      );
    }
  };

  return (
    <>
      <section className="category-wrapper cotegories-border mb35">
        <div className="overflow-wrap">
          <div className="Category-list-wrap inner-container flex">
            {handleBarList()}
          </div>
        </div>
      </section>
    </>
  );
}
