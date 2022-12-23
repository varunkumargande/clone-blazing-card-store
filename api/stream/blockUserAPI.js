import APIServices from "../../services";
import { apiValidation } from "../utils/apiValidation";

export async function blockUserAPI(
  streamUUID,
  vendorId,
  moderatorId,
  blockedUserId,
  dispatch
) {
  const data = JSON.stringify({
    stream_uuid: streamUUID,
    vendor_id: vendorId,
    moderator_id: moderatorId,
    blocked_user_id: blockedUserId,
  });
  const result = await APIServices.create("stream/block_stream_user", data);
  const resp = apiValidation(result, dispatch);
  return result;
}
