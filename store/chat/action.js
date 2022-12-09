import { getChatNotification } from "../../api/chat";

export function fetchUserChatNotification(state, dispatch) {
  return () => {
    dispatch(getChatNotification(state));
  };
}
