import React from "react";
import Styles from "../../../modular_scss/CategoriesMobile.module.scss";
export default function CategoriesMobile(props) {
  const { category } = props;
  const Accordion = ({ title, children }) => {
    const [isOpen, setOpen] = React.useState(false);
    return (
      <div className={`accordion-wrapper ${Styles.AccordionWrapper}`}>
        <div
          className={`accordion-title ${Styles.Title} ${isOpen ? "open" : ""}`}
          onClick={() => setOpen(!isOpen)}
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
              title={`${element?.name}`}
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
