import { useState, useEffect } from "react";
import Router from "next/router";

export function Loader() {
  return (
    <>
      <div>
        <img src={"/static/img/Loader/loader_blue.gif"} alt="Loading" />
      </div>
    </>
  );
}
