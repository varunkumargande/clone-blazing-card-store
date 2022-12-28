import axios from "axios";
import { apiUrl } from "../url";
import ToastMessage from "../toast";
import { getErrorMessage } from "../../utilities/common-helpers";

const saveSelectedCategories = async (data, setIsInterestedCategoryOpen) => {
  try {
    const token = localStorage.getItem("blazingToken");
    const response = await axios.post(
      `${apiUrl}/category/insert-interest`,
      {
        categories: data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response?.data?.status === 1) {
      setIsInterestedCategoryOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
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
export default saveSelectedCategories;
