import Router, { useRouter } from "next/router";
import React from "react";
import Styles from "../../../modular_scss/CategoriesMobile.module.scss";
import { useDispatch } from "react-redux";
import {
  saveCategoryName,
  saveSubCategoryName,
} from "../../../store/category/action";
import { useEffect } from "react";
import { memo } from "react";

function CategoriesMobile(props) {
  const { category, handleSelectCategory } = props;
  const dispatch = useDispatch();
  const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { query } = useRouter();

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
            !isOpen ? handleSelectCategory(title) : setIsOpen(false);
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
  return (
    <div className={`${Styles.MobileCard}`}>
      {category &&
        category?.categories?.map((element, index) => {
          return (
            <Accordion
              title={`${element?.categorySlug}`}
              handleSelectCategory={handleSelectCategory}
            >
              <div className="card-content">
                <ul className={`${Styles.ListWrap}`}>
                  <li
                    className={`flex space-between flex-center ${Styles.List}`}
                  >
                    All
                    <button className={`${Styles.CheckBtn}`}></button>
                  </li>
                  <li
                    className={`flex space-between flex-center ${Styles.List} ${Styles.ListActive}`}
                  >
                    All
                    <button
                      className={`${Styles.CheckBtn} ${Styles.CheckBtnActive}`}
                    ></button>
                  </li>
                </ul>
              </div>
            </Accordion>
          );
        })}

      {/* <Accordion title="Watches">
                <div className="card-content">
                    <ul className={`${Styles.ListWrap}`}>
                        <li className={`flex space-between flex-center ${Styles.List}`}>
                            All 
                            <button className={`${Styles.CheckBtn}`}></button>
                        </li>
                        <li className={`flex space-between flex-center ${Styles.List} ${Styles.ListActive}`}>
                            All 
                            <button className={`${Styles.CheckBtn} ${Styles.CheckBtnActive}`}></button>
                        </li>
                    </ul>
                </div>
            </Accordion> */}
    </div>
  );
}
export default memo(CategoriesMobile);
