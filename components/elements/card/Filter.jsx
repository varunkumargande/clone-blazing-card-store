import React, { useState } from "react";
import useCollapse from "react-collapsed";

function Filter() {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <>
      {category.map((cat) => (
        <div className="collapsible">
          <div className="header" {...getToggleProps()}>
            <div>{cat}</div>
          </div>
          <div {...getCollapseProps()}>
            <div className="content">
              <ul>
                <li>Football</li>
                <li>Cricket</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Filter;
