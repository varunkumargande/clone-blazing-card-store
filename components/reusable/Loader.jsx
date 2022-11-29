import { useState, useEffect } from "react";
import Router from "next/router";

export function Loader(props) {
  return (
    <>
      <div>
        <img className={props.className}  src={"/static/img/Loader/loader_blue.gif"} alt="Loading" />
      </div>
    </>
  );
}
