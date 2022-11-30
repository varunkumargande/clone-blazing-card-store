
import React from "react";
import { useRouter } from "next/router";
import IconBack from "../Icons/IconBack";

const BackButton = ({name, backUrl=null}) => {
  const router = useRouter();
  /**
   * @method: handleOnClick
   * @description: As name implies, handles the click functionlaity when clicked on back icon.
   */
  const handleOnClick = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back()
    }
  }
  return (<>
  <h3 className="flex flex-center"><div className="edit-back" onClick={handleOnClick} ><IconBack/></div>{name}</h3>
  </>);
}

export default BackButton;