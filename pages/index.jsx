import Card from "../components/elements/card/Card";
import React from "react";
import Hero from "../components/elements/Hero";

import HeaderHome from "../components/shared/headers/HeaderHome";
import HeaderMobile from "../components/shared/headers/HeaderMobile";

function home() {
  return (
    <div>
      <HeaderHome />
      <HeaderMobile />
      <Hero />
      <Card />
    </div>
  );
}

export default home;
