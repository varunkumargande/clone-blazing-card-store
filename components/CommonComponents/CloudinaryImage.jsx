//#region Built In Imports
import React, { memo } from "react";

//#region Internal Imports
import { Cloudinary } from "cloudinary-core";
import { getCloudinaryImageUrl } from "../../utilities/utils";

function CloudinaryImage(props) {
  try {
    //#region Type Declaration / Definition
    let returnElement = <></>;
    let imageTransformation =
      props.transformation !== undefined ? props.transformation : "";

    //#endregion

    if (!props.imageUrl) {
      return null;
    }

    let cl = new Cloudinary({
      cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
      secure: true,
    });

    cl.responsive();
    returnElement = (
      <img
        key={props.keyId}
        data-src={getCloudinaryImageUrl(
          props.imageUrl,
          imageTransformation,
          props.isGif
        )}
        src={getCloudinaryImageUrl(
          props.imageUrl,
          imageTransformation,
          props.isGif
        )}
        alt={props?.alternative}
        className="cld-responsive"
        sizes="100vw"
        onClick={props.onClick}
      />
    );

    return returnElement;
  } catch (error) {}
}

export default memo(CloudinaryImage);