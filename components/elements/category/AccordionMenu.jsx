import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";


// import "react-accessible-accordion/dist/fancy-example.css";

export default function AccordionMenu() {
  const [category, setCategory] = useState([
    "Trading Card Games",
    "Sports",
    "Toys",
    "Action Figures",
    " Comics & Manga",
    "Sneakers & Streetwear",
    "Vintage & Thrift Clothing",
    "Bags & Accessories",
    "Jewelry",
    "Watches",
    "Video Games",
    "NFTs",
    " Coins & Money",
    " Music",
    " Electronics",
    " Arts & Crafts",
    "Estate Sales and Vintage Decor",
    " Disneyana"
  ]);

  return (
    <>
      <Accordion allowZeroExpanded>
        {category.map((cat) => (
          <div>
            {" "}
            <AccordionItem>
              <AccordionItemHeading className="header">
                <AccordionItemButton>{cat}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="content">
                <p>football</p>
                <p>Fames</p>
                <p>football</p>
                <p>Fames</p>
                <p>football</p>
                <p>Fames</p>
                <p>football</p>
                <p>Fames</p>
                <p>football</p>
                <p>Fames</p>
              </AccordionItemPanel>
            </AccordionItem>
          </div>
        ))}
      </Accordion>

     
    </>
  );
}
