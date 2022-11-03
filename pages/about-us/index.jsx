import React, { useState, useEffect } from "react";
import Footer from "../../components/partials/LandingPage/Footer";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import MobileHeader from "../../components/shared/headers/MobileHeader";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";

export default function landingpage() {
  const { isMobile } = useIsMobile();

  return (
    <div className="home-container">
      {isMobile ? <MobileHeader /> : <HeaderDefault />}
      <section className="static-container">
        <h1>About Us</h1>
        <div className="last-update">Last updated November 29, 2021</div>
        <div className="static-inner-container">
          <ol>
            <li>
              Trend Live. (“trend live,” the “Company,” “we” and “us”) provides
              a marketplace to bring together collectors and enthusiasts and
              make it easy and safe to connect, buy and sell. This Privacy
              Policy is designed to help you understand how we collect, use, and
              share your personal information and to help you understand and
              exercise your privacy rights.
            </li>
          </ol>
        </div>
      </section>
      <Footer />
    </div>
  );
}
