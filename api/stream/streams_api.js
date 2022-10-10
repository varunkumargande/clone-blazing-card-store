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

  export const streamLikeDislike = async (data) => {
    try {
      const response = await APIServices.create("stream/stream-like-unlike", data);
      if(response?.data?.status) {
        return {data: response?.data?.data, status: true};
      }      
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  };

  export const userFollowUnfollow = async (data) => {
    try {
      const response = await APIServices.create("follow/follow_unfollow", data);
      if(response?.data?.status) {
        return {data: response?.data?.data, status: true};
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  };


  export const getCardDetails = async (userId, url) => {
    try {

      const response = await APIServices.get(url, userId)

      return response.data.data;
    } catch (error) {
      if (error.response) {
      } else {
        
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
        
      }
    }
  };