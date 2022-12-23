import { modalSuccess, modalWarning } from "../intercept";
import APIServices from "../../services";

export async function blockedUserListApi(streamUUID) {
  const result = await APIServices.getAll(
    `stream/stream_blocked_user_list?stream_uuid=${streamUUID}`
  );
  if (result?.data?.status === 1) {
    return result;
  } else {
    modalWarning("error", result?.data?.message);
    return result;
  }
}
