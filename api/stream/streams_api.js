import APIServices from "../../services"

 export const getProducts = async (url) => {
    try {
      const response = await APIServices.getAll(url);
      if(response?.data?.status) {
        return response?.data?.data;
      }      
    } catch (error) {
      console.error(error)
    }
  };


  export const getCardDetails = async (userId, url) => {
    try {

      const response = await APIServices.get(url, userId)

      return response.data.data;
    } catch (error) {
      if (error.response) {
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };


 export const getAddress = async () => {
    try {
      const response = await axios.get(
        "https://blazing-card-backend-dev.kellton.net/api/address/get-address",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  export const buyProduct = async (body) => {
    try {
      const url = "https://blazing-card-backend-dev.kellton.net/api/orders/customer-pay";
      const response = await APIServices.create(url, body);
      // const response = await axios.get(
      //   "https://blazing-card-backend-dev.kellton.net/api/address/get-address",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      return response.data.data;
    } catch (error) {
      if (error.response) {
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };