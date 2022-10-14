import { cloudImageUrl } from "../api/url";

export const stringFormatter = (string) =>  {
    
    return string ? (string.toLowerCase()).charAt(0).toUpperCase() + (string.toLowerCase()).slice(1) : '';
}
export const getCloudinaryImageUrl = (
    imageUrl,
    Transformation,
    isGif = false
  ) => {
    let transformation_ = Transformation;
    if (isGif) {
      return `${cloudImageUrl}/blazing/${imageUrl}`;
    }
    if (imageUrl && imageUrl.toLowerCase().match(/\.(gif)$/)) {
      transformation_ = transformation_.replace(",dpr_auto", "");
      transformation_ = transformation_ + ",fl_lossy";
    }
    return `${cloudImageUrl}${transformation_}/blazing/${imageUrl}`;
  };