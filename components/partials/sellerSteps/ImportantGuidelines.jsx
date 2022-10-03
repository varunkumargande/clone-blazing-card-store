import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { rulesAcknowledgement } from "../../../store/becomeSeller/action";
import IconCheck from "../../Icons/iconCheck";

export default function ImportantGuidelines() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state?.becomeSeller?.guideLines);
  const router = useRouter();

  const handleSubmit = () => {
    dispatch(rulesAcknowledgement({ isAgree: 1 }, router));
  };
  // useEffect(() => {
  //   if (status) {
  //     router.push("/become-seller/basicDetails", undefined, { shallow: true });
  //   }
  // }, [status]);
  return (
    <div className="step-container">
      <h3>Important Guidelines</h3>
      <div className="sub-title">
        Let's keep the community safe together. Please follow the rules, or you
        may lose the ability to sell on Blazing Cards, or be charged a fee.
      </div>
      <div className="guidlines-step flex flex-start">
        <div className="Check-icon">
          <IconCheck />
        </div>
        <div className="ruls-wrap">
          <h4>Ship within 2 business days</h4>
          <p>
            Please ship items within 2 business after a show or when an item is
            sold
          </p>
        </div>
      </div>
      <div className="guidlines-step flex flex-start">
        <div className="Check-icon">
          <IconCheck />
        </div>
        <div className="ruls-wrap">
          <h4>Package items safely</h4>
          <p>
            Package items you sell with care and in protective material to
            ensure they don't get damaged
          </p>
        </div>
      </div>
      <div className="guidlines-step flex flex-start">
        <div className="Check-icon">
          <IconCheck />
        </div>
        <div className="ruls-wrap">
          <h4>Don't sell counterfeits</h4>
          <p>
            Don’t sell fake items on Whatnot. If you’re unsure of an items
            authenticity, don’t sell it
          </p>
        </div>
      </div>
      <div className="guidlines-step flex flex-start">
        <div className="Check-icon">
          <IconCheck />
        </div>
        <div className="ruls-wrap">
          <h4>Don’t lie about an item</h4>
          <p>
            Don’t mislead a buyer about an item’s value, condition or anything
            else
          </p>
        </div>
      </div>
      <div className="guidlines-step flex flex-start">
        <div className="Check-icon">
          <IconCheck />
        </div>
        <div className="ruls-wrap">
          <h4>Be nice</h4>
          <p>
            Make sure you treat everyone with respect, and don’t harass or bully
            anyone in the community
          </p>
        </div>
      </div>
      <div className="guidlines-step flex flex-start">
        <div className="Check-icon">
          <IconCheck />
        </div>
        <div className="ruls-wrap">
          <h4>Follow our policies</h4>
          <p>
            We've got more details on our policies here. In essence, just be
            honest and nice
          </p>
        </div>
      </div>
      <div className="button-wrapper">
        <button onClick={handleSubmit} className="primary-btn">
          I agree to the Rules
        </button>
      </div>
    </div>
  );
}
