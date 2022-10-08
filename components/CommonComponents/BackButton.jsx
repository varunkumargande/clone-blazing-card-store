
import React from "react";
import { useRouter } from "next/router";
import IconBack from "../Icons/IconBack";

const BackButton = ({name}) => {
  const router = useRouter();
  return (<>
  <h3 className="flex flex-center"><div className="edit-back" onClick={() => router.back()} ><IconBack/></div>{name}</h3>
  </>);
}

export default BackButton;