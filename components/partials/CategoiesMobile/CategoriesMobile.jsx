import Router, { useRouter } from "next/router";
import React, { useMemo } from "react";
import Styles from "../../../modular_scss/CategoriesMobile.module.scss";
import { useDispatch } from "react-redux";
import {
  saveCategoryName,
  saveSubCategoryName,
} from "../../../store/category/action";
import { useEffect } from "react";
import { memo } from "react";
import { getStreamSubCategoryBasedApi } from "../../../api/stream/subStreamDetail";
import { useState } from "react";
import { camelCase } from "../../../utilities/utils";
import SeeAllSubCategories from "../../../components/partials/SeeAll/subCategories";

function CategoriesMobile(props) {
  const {
    category,
    handleSelectCategory,
    setCatIndex,
    setStreamData,
    setLoader,
    offset,
    setOffset,
    streamData,
    setSeeMoreLoader,
    setSubCatId,
  } = props;

  const { query } = useRouter();

  const Accordion = ({ title, index, children }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
      if (query?.category === title) {
        setIsOpen(!isOpen);
      } else if (isOpen) {
        setIsOpen(false);
      }
    }, [query?.category]);

    return (
      <div className={`accordion-wrapper ${Styles.AccordionWrapper}`}>
        <div
          className={`accordion-title ${Styles.Title} ${isOpen ? "open" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            !isOpen ? handleSelectCategory(title, index) : setIsOpen(false);
          }}
        >
          {title}
        </div>
        <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
          <div className={`accordion-content ${Styles.AccordionItem}`}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  const showSubCategories = useMemo(() => {
    return (
      category &&
      !!category?.categories.length &&
      category?.categories?.map((element, index) => {
        return (
          <Accordion title={`${element?.categorySlug}`} index={index}>
            {query?.category === element?.categorySlug && (
              <div className="card-content">
                <ul className={`${Styles.ListWrap}`}>
                  <SeeAllSubCategories
                    catIndex={index}
                    setSubCatId={setSubCatId}
                    setStreamData={setStreamData}
                    setLoader={setLoader}
                    offset={offset}
                    streamData={streamData}
                    setOffset={setOffset}
                    setSeeMoreLoader={setSeeMoreLoader}
                  />
                </ul>
              </div>
            )}
          </Accordion>
        );
      })
    );
  }, [category?.categories, query?.category]);

  return <div className={`${Styles.MobileCard}`}>{showSubCategories}</div>;
}
export default memo(CategoriesMobile);
