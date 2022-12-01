import axios from "axios";
import { apiUrl } from "../url";
import ToastMessage from "../toast/index";
import { getErrorMessage } from "../../utilities/common-helpers";

const getCategoriesToSelect = async () => {
  try {
    const token = localStorage.getItem("blazingToken");
    const response = await axios.get(`${apiUrl}/category/category-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    const toast = {
      message: getErrorMessage(),
      type: "error",
    };
    {
      <ToastMessage data={toast} />;
    }
  }
};
export default getCategoriesToSelect;
