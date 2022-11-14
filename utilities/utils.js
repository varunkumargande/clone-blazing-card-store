import moment from "moment";
import { cloudImageUrl, cloudFolder } from "../api/url";

export const stringFormatter = (string) => {

  return string ? (string.toLowerCase()).charAt(0).toUpperCase() + (string.toLowerCase()).slice(1) : '';
}
export const getCloudinaryImageUrl = (
  imageUrl,
  Transformation,
  isGif = false
) => {
  let transformation_ = Transformation;
  if (isGif) {
    return `${cloudImageUrl}/${cloudFolder}/${imageUrl}`;
  }
  if (imageUrl && imageUrl.toLowerCase().match(/\.(gif)$/)) {
    transformation_ = transformation_.replace(",dpr_auto", "");
    transformation_ = transformation_ + ",fl_lossy";
  }
  return `${cloudImageUrl}${transformation_}/${cloudFolder}/${imageUrl}`;
};

/**
 * Method convert utc to local
 * @param {*} date 
 * @param {*} time 
 * @returns 
 */
export const utcToLocal = (date, time) => {
  const utcTimeFormat = moment.utc(`${date} ${time}`).toDate();
  return moment(utcTimeFormat).local().format("YYYY-MM-DD HH:mm");
}

/**
 * Method to get Schedule Time for the card
 * @param {*} date "YYYY-MM-DD"
 * @param {*} time "HH:mm"
 * @returns 
 */
export const getStreamScheduleDate = (date, time , dateOnly = false) => {
  if(!date || !time) {
    return;
  }
  const utcTimeFormat = moment.utc(`${date} ${time}`).toDate(); // this will convert date string to UTC format
  const localDateTime = moment(utcTimeFormat).local().format("YYYY-MM-DD HH:mm"); // This will get local date and time
  const localDate = moment(utcTimeFormat).local().format("YYYY-MM-DD"); // This will get local date and time
  const convertedTime = (localDateTime.split(" "))[1]; // at array first index you will get Local time
  const currentTime = moment(moment().format("YYYY-MM-DD HH:mm")); // this will get current Local time
  const scheduleTime = moment(localDateTime);
  const difference = !!dateOnly ? 'isDate' : scheduleTime.diff(currentTime, 'days');
  switch (difference) {
    case 0:
      return `Today ${convertedTime}`
    case 1:
      return `Tomorrow ${convertedTime}`
    case 'isDate':
      return `${localDate}`
    default:
      return `After ${difference} days`
  }
}

/**
 * Method to get statename using StateCode
 * @param {*} stateCode 
 * @returns 
 */
export const getStateName = (stateList,stateCode) => {
  if(!stateList && !stateName) {
    return ;
  }
  let stateName = [{name : ''}];
  stateName = stateList.filter((element) => element?.code === stateCode)
  return stateName[0].name;
}