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
// import "react-accessible-accordion/dist/fancy-example.css";

export default function AccordionMenu() {
  const categories = useSelector((state) => state.category.categories.data);
  const [category, setCategory] = useState([
    { name: "Trading Card Games", subtitle: ["football", "cricket", "tennis"] },
    { name: "Sports", subtitle: ["football", "cricket", "tennis"] },
    { name: "Toys", subtitle: ["football", "cricket", "tennis"] },
    { name: "Action Figures", subtitle: ["football", "cricket", "tennis"] },
    { name: " Comics & Manga", subtitle: ["football", "cricket", "tennis"] },
    {
      name: "Sneakers & Streetwear",
      subtitle: ["football", "cricket", "tennis"],
    },
    {
      name: "Vintage & Thrift Clothing",
      subtitle: ["football", "cricket", "tennis"],
    },
    { name: "Bags & Accessories", subtitle: ["football", "cricket", "tennis"] },
    { name: "Jewelry", subtitle: ["football", "cricket", "tennis"] },
    { name: "Watches", subtitle: ["football", "cricket", "tennis"] },
    { name: "Video Games", subtitle: ["football", "cricket", "tennis"] },
    { name: "NFTs", subtitle: ["football", "cricket", "tennis"] },
    { name: " Coins & Money", subtitle: ["football", "cricket", "tennis"] },
    { name: " Music", subtitle: ["football", "cricket", "tennis"] },
    { name: " Electronics", subtitle: ["football", "cricket", "tennis"] },
    { name: " Arts & Crafts", subtitle: ["football", "cricket", "tennis"] },
    {
      name: "Estate Sales and Vintage Decor",
      subtitle: ["football", "cricket", "tennis"],
    },
    { name: " Disneyana", subtitle: ["football", "cricket", "tennis"] },
  ]);
  const [children] = useState(["football","cricket","tennis"])
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch({});

  useEffect(() => {
    categoryApi(dispatch);
  }, []);
  console.log(categories,"here is the object");
  // console.log(category);
  const handleClick = () => {
    return setToggle(!toggle);
  };

  return (
    <>

      <Accordion className="menu-container" allowMultipleExpanded allowZeroExpanded>
        {category.map(( cat) => (
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
                  {children.map((sub)=>{
                <AccordionItemPanel className="content">
             
                <p>{sub}</p>
           
              </AccordionItemPanel>
                })} 
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </>
  );
}
