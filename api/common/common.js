// import { useEffect, useState } from 'react';
import APIServices from '../../services'

export const getImageSignedUrl = async (payLoad) => {
  const result = await APIServices.put(`media/get-presigned-url-s3?path=${payLoad.path}&key=${payLoad.key}`)
  if (result && result.data && result.data) {
    return result.data;
  }
  return false
}


export const getStateList = async (setStateList) => {
  const result = await APIServices.getAll("list/zone-list?limit=0&offset=0&keyword=&count=0&status=1")
  if (result && result?.status == 200 && result?.data?.status == 1) {
    setStateList(result.data.data);
  }
}

// export const getCurrentUser = () => {
//   // var currentUser = JSON.parse(localStorage.getItem('chat-app-current-user'))
//   // return currentUser
//     var currentUser = JSON.parse(localStorage.getItem('chat-app-current-user'))
//     if(!!currentUser) {
//       return currentUser
//     }
//     else {
//       console.log("No data found")
//     }
// }
