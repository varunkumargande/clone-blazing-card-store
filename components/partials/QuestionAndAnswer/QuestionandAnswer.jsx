import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReportsPopup from "./ReportPopups";
import PostQuestionsPopup from "./PostQuestionPopup";
// import { abuseListApi } from '../../api';
import Link from "next/link";
// import LikeQues from '../../components/partials/product/LikeUnlike';
import moment from "moment";
// import { useTranslation } from '../../i18n';
import Router from "next/router";
import { questionsandAnswerApi } from "../../../api/product/QuestionAnswerApi";
import { abuseListApi } from "../../../api";
import LikeQues from "../product/LikeUnlike";
import { useTranslation } from "../../../i18n";
function QuestionandAnswer({ productId }) {
  const singleProduct = useSelector((s) => s.product.singleProduct);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showQuesModal, setShowQuesModal] = useState(false);
  const [abuseReason, setAbuseReason] = useState([]);
  const [questionInfo, setquestionInfo] = useState([]);
  const [ansId, setAnsId] = useState("");

  const [keyword, setKeyWord] = useState("");
  const [limit, setLimit] = useState(3);
  const [product, setproduct] = useState(singleProduct);

  // useEffect(()=>{

  //     setproduct(singleProduct)

  // },[productId,product,singleProduct])

  useEffect(() => {
    questionsandAnswerApi(productId, setquestionInfo, keyword, limit);
  }, [singleProduct]);

  const { t } = useTranslation("common");
  // let res = {};
  // product && product.productImage.forEach(obj => {
  //     res["name"] = obj.image; res["containerName"] = obj.containerName
  // })

  const abuseFunc = (e, answerId) => {
    setAnsId(answerId);
    e.preventDefault();
    setShowReportModal(true);
    abuseListApi(setAbuseReason);
  };
  const handleAddItemToWishlist = (e, productId) => {
    e.preventDefault();

    let AuthCheck = sessionStorage.getItem("blazingToken");

    if (AuthCheck) {
      setShowQuesModal(true);
    } else {
      Router.push("/account/login");
    }
  };

  return (
    <div className="ps-questions">
      <ReportsPopup
        showModal={showReportModal}
        setShowModal={setShowReportModal}
        abuseReason={abuseReason}
        ansId={ansId}
      />
      <PostQuestionsPopup
        showModal={showQuesModal}
        setShowModal={setShowQuesModal}
        productId={productId}
      />
      <div className="questions-header">
        <h5>{t("products.CustomerQuestionsAnswer")}</h5>
        <div className="post-question">
          <button onClick={(e) => handleAddItemToWishlist(e)}>
            {t("products.PostYourQuestion")}
          </button>
        </div>
      </div>

      {questionInfo && questionInfo.length !== 0 ? (
        <>
          {questionInfo &&
            questionInfo.map((info, index) => {
              return (
                <div className="question-answer-containor" key={index}>
                  <div className="product-ques-content">
                    <h3>
                      <span>Question</span>
                      <div className="product-question-main">
                        {info.question} ?
                      </div>
                    </h3>

                    {info.answerCount !== 0 && (
                      <div className="product-answer-section">
                        <span>{t("Customerquestions.Answer")}</span>
                        <div className="product-answer-container">
                          <h5>
                            {info && info.answerList && info.answerList.answer}
                          </h5>
                        </div>
                      </div>
                    )}
                    {info && info.postedBy && info.postedBy.firstName && (
                      <h5 style={{ marginTop: "10px" }}>
                        {info.postedBy.firstName}{" "}
                        <span>
                          {moment(
                            info &&
                              info.answerList &&
                              info.answerList.createdDate
                          ).format("LL")}
                        </span>
                      </h5>
                    )}

                    {info.answerList && (
                      <LikeQues
                        answerId={
                          info && info.answerList && info.answerList.answerId
                        }
                        likes={info && info.answerList && info.answerList.likes}
                        unLike={
                          info && info.answerList && info.answerList.dislikes
                        }
                        userLike={
                          info && info.answerList && info.answerList.likeType
                        }
                        setShowReportModal={setShowReportModal}
                        setAnsId={setAnsId}
                        setAbuseReason={setAbuseReason}
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </>
      ) : (
        <div className=" ">
          <p>{t("products.NoQuestionFound")}</p>
        </div>
      )}

      {questionInfo.length >= 3 ? (
        <div className="view-all-questions">
          <Link
            href={{
              pathname: "/product/productquestion",
              query: {
                productId: product.productId,
                name: product.name,
                price: product.price,
                productSlug: product.productSlug,
              },
            }}
          >
            <a>{t("checkouts.ViewAll")}</a>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default QuestionandAnswer;
