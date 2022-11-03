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
        <h1>TERMS OF SERVICE</h1>
        <div className="last-update">Last Updated: Sep 29, 2022</div>
        <div className="static-inner-container">
          <p>
            Welcome to Trend Live! To make these Terms of Service (the "Terms")
            easier to read, we will sometimes refer to Trend Live INC.
            (including our directors, officers, members, managers, employees,
            affiliates, successors and assigns (each, a "Trend
            Live Representative"), except when acting as a User) as "Trend
            Live", "our", "we", or "us"; we will refer to you as "you" or a
            derivative of you; and we will refer to a user who creates an
            account on Trend Live as a "User(s)". In some instances when
            describing interactions between Users we will differentiate between
            "buyer" Users (each, a "Buyer") and "seller" Users (each, a
            "Seller").
          </p>
          <p>
            Please review these Terms, the Trend Live Privacy Policy ("Privacy
            Policy" located at http://www.Trend Live.com/privacy), and all other
            policies and rules published by Trend Live ("Other
            Policies") before you begin using Trend Live because the Terms,
            Privacy Policy, and Other Policies create a legal agreement between
            you and Trend Live. By using Trend Live, you accept and agree to be
            bound and abide by these Terms, our Privacy Policy, and our Other
            Policies, each of which are incorporated herein by reference. If you
            do not agree to these Terms, our Privacy Policy, or our Other
            policies you are not allowed to, and you must not, access or use
            Trend Live.
          </p>
          <h3>IMPORTANT NOTICE REGARDING ARBITRATION</h3>
          <p>
            <strong>
              When you agree to these terms you are agreeing (with limited
              exception) to resolve any dispute between you and trend live
              through binding, individual arbitration rather than in court.
              Please review carefully the arbitration generally and arbitration
              agreement section below for details regarding arbitration.
              However, if you are a resident of a jurisdiction where applicable
              law prohibits arbitration
            </strong>
          </p>
          <p>
            <strong>
              Trend Live is a platform. Trend live facilitates transactions
              between the buyer and seller on the app but is not a party to any
              agreement between the buyer and seller of items or NFT’s or
              between any users, unless trend live is the seller of the NFT.
            </strong>
          </p>
          <p>
            For NFT transactions, you bear full responsibility for verifying the
            identity, legitimacy, and authenticity of the NFT’S you purchase
            through the app. Not with standing indicators and messages that
            suggest verification, trend live makes no claims about the identity,
            legitimacy, or authenticity of NFT’S on the app.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
