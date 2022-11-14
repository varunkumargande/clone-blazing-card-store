import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../../components/partials/LandingPage/Footer";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import IconBack from "../../components/Icons/IconBack";
import { useRouter } from "next/router";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";

export default function landingpage() {
  const router = useRouter();
  const { isMobile } = useIsMobile();

  const breadCrumb = [
    {
      text: "Home /",
      url: "/",
    },
    {
      text: " FAQs",
      url: "/faqs/",
    },
  ];
  const createBreadCrumb = () => {
    return (
      <>
        {breadCrumb.map((link) => (
          <li
            key={link.text}
            className={
              breadCrumb.indexOf(link) === breadCrumb.length - 1
                ? "current"
                : ""
            }
          >
            <Link href={link.url}>
              <a>{link.text}</a>
            </Link>
          </li>
        ))}
      </>
    );
  };
  const handleBackButton = () => {
    router.back();
  };
  const Accordion = ({ title, children }) => {
    const [isOpen, setOpen] = React.useState(false);
    return (
      <div className="accordion-wrapper">
        <div
          className={`accordion-title ${isOpen ? "open" : ""}`}
          onClick={() => setOpen(!isOpen)}
        >
          {title}
        </div>
        <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
          <div className="accordion-content">{children}</div>
        </div>
      </div>
    );
  };
  return (
    <div className="home-container">
      {isMobile ? "" : <HeaderDefault />}
      <section className="static-container faqs">
        {isMobile ? (
          ""
        ) : (
          <section className="breadcrumbs-wrapper no-bg mb26">
            <ul className="breadcrumbs flex flex-center">
              {createBreadCrumb()}
            </ul>
          </section>
        )}
        <h1 className="flex flex-center">
          <div className="edit-back" onClick={handleBackButton}>
            <IconBack />
          </div>{" "}
          FAQs
        </h1>
        <section className="category-wrapper cotegories-border mb35">
          <div className="overflow-wrap">
            <div className="Category-list-wrap inner-container flex">
              <div className="category-list">
                <button className="title active">Buyer</button>
              </div>
              <div className="category-list">
                <button className="title false">Seller</button>
              </div>
            </div>
          </div>
        </section>
        <div className="faq-inner-container">
          <Accordion title="I am being charged extra for postage, what should I do?">
            We utilize the Post Office’s ePostage program, any additional
            charges will be charged to our account per an agreement that we have
            with USPS. If USPS is asking you to pay for postage due, please
            click here to reach out to our Support team with your order and
            tracking info handy. Please provide photos of the documentation from
            USPS regarding the postage due, and we will be happy to fully
            reimburse the extra charge.
          </Accordion>
          <Accordion title="How much is shipping for buyers?">
            We utilize the Post Office’s ePostage program, any additional
            charges will be charged to our account per an agreement that we have
            with USPS. If USPS is asking you to pay for postage due, please
            click here to reach out to our Support team with your order and
            tracking info handy. Please provide photos of the documentation from
            USPS regarding the postage due, and we will be happy to fully
            reimburse the extra charge.
          </Accordion>
          <Accordion title="How long do refunds take?">
            We utilize the Post Office’s ePostage program, any additional
            charges will be charged to our account per an agreement that we have
            with USPS. If USPS is asking you to pay for postage due, please
            click here to reach out to our Support team with your order and
            tracking info handy. Please provide photos of the documentation from
            USPS regarding the postage due, and we will be happy to fully
            reimburse the extra charge.
          </Accordion>
          <Accordion title="There is a problem with my order and I qualify for a return/refund, but I believe the item is worth more than I paid. What can I do?">
            There is a problem with my order and I qualify for a return/refund,
            but I believe the item is worth more than I paid. What can I do?
          </Accordion>
        </div>
      </section>
      <Footer />
    </div>
  );
}
