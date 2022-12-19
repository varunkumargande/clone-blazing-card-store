import { addFriend, loginRoute } from "../../chatService";
import axios from "axios";
import { ALREADY_FRIEND_ERROR_CODE, chatConstant } from "../../components/Constants";
import { modalSuccess, modalWarning } from "../intercept";
import Router from "next/router";
import { show } from "../../store/toast/action";
import { getErrorMessage } from "../../utilities/common-helpers";

export async function chatLogin(dispatch, userId=null) {
  const token = localStorage.getItem("blazingToken");
  const chatHeader = {
    // 'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const { data } = await axios.post(loginRoute, "", {
    headers: chatHeader,
  });
  if (data.success === true) {
    localStorage.setItem(
      chatConstant["localStorageKey"],
      JSON.stringify(data.response.user)
    );
     
    if (userId && data?.response?.user?._id) {
      await addUserAsFriend(userId, data?.response?.user?._id, chatHeader, dispatch);
    }
    Router.push({
      pathname: "/chat",
      query: {
        chatUserId: userId
      }
    }, "/chat");
  }
}

/**
 * @method: addUserAsFriend
 * @description: this method is called when user click on message on someone profile.
 *               If the user is not added as friend then it will be added as friend first, 
 *               if he is already added in friend list then the flow will continue without any issue.   
 */
const addUserAsFriend = async (userId, currentChatUserId, chatHeader, dispatch) => {
  return await axios.post(addFriend, {
      userId: currentChatUserId,
      friendId: userId,
    }, {
      headers: chatHeader,
    }).then((response) => {
      if (!response?.data?.success) {
        const errorMessage = getErrorMessage(response);
        dispatch(show({ message: errorMessage, type: "error" }));
      }
    })
    .catch((error) => {
      if (error?.response?.data?.message !== ALREADY_FRIEND_ERROR_CODE) {
        const errorMessage = getErrorMessage(error?.response);
        dispatch(show({ message: errorMessage, type: "error" }));
      }
    });
}
//  const chatData = {
//    username: JSON.parse(localStorage.getItem("blazingUser")).username,
//    password: localStorage.getItem("userPass"),
//  };
//  const { data } = await axios.post(loginRoute, chatData);
//  if (data.status === true) {
//    localStorage.setItem(
//      chatConstant["localStorageKey"],
//      JSON.stringify(data.user)
//    );
//    Router.push("/chat")
//    modalSuccess('success',"success")
//  } else {
//    alert(data?.msg)
//    modalWarning("error", "error")
//  }
