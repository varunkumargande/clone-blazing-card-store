import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { categoryApi } from "../../../api/category/category";

export default function AccordionMenu() {
  const categories = useSelector((state) => state?.category?.categories);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch({});

  useEffect(() => {
    categoryApi(dispatch);
  }, []);
  const handleClick = () => {
    return setToggle(!toggle);
  };

  const getSubCat = (subcat) => {
    return subcat?.map((title) => {
      return <p>{title.name}</p>;
    });
  };

  return (
    <>
      <Accordion
        className="menu-container"
        allowMultipleExpanded
        allowZeroExpanded
      >
        {categories.map((cat) => (
          <div>
            {" "}
            <AccordionItem>
              <AccordionItemHeading className="header">
                <AccordionItemButton>
                  <div onClick={() => handleClick()} className="haeder-item">
                    <div>{cat.name}</div>
                    <div>
                      {toggle ? (
                        <img src="/static/img/arrow-up.png" />
                      ) : (
                        <img src="/static/img/down-arrow1.png" />
                      )}
                    </div>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>

              <AccordionItemPanel className="content">
                {getSubCat(cat?.children)}
              </AccordionItemPanel>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </>
  );
}
