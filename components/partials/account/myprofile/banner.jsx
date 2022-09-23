import React, { useState, useEffect, useRef } from "react";

export default function ProfileBanner() {
    return (
        <>
            <section className="category-banner">
                <img src="/static/images/cover.png" alt="cover" />
                <div className="cover-wrap flex justify-right"><button className="border-btn cover-btn">Edit Cover Photo</button></div>
            </section>
        </>
    );
}