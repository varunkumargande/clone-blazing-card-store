import axios from 'axios';

 export const fetchProducts = async (setProductListing, setIsLoading) => {
    try {
      // const response = await axios.get('http://52.72.64.43:9000/api/stream/streamProductList?streamuuid=563c7ecb-176a-4258-b0d4-119b8b804d60&sellType=auction');
      const url = "";
      switch (toggleState) {
        case TOGGLE_STATES.AUCTION:
          url =
            "https://blazing-card-backend-dev.kellton.net/api/stream/streamProductList?streamuuid=563c7ecb-176a-4258-b0d4-119b8b804d60&sellType=auction";
          break;
        case TOGGLE_STATES.BUYNOW:
          url =
            "https://blazing-card-backend-dev.kellton.net/api/stream/streamProductList?streamuuid=563c7ecb-176a-4258-b0d4-119b8b804d60&sellType=buy_now";
          break;
        case TOGGLE_STATES.GIVEAWAY:
          break;
        case TOGGLE_STATES.SOLD:
          break;
      }

      const response = await axios.get(url);

      const data = response?.data?.data;
      setProductListing(data);
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(err.response.status);
        console.log(error.response.header);
        setIsLoading(false);
      } else {
        console.log(`Error: ${error.message}`);
        setIsLoading(false);
      }
    }
  };


  export const fetchCardDetails = async (userId, setAddress, setCard, setCardData, setToken) => {
    try {
      // const response = await axios.get('http://52.72.64.43:9000/api/customer-card-details/listCard/13');
      const response = await axios.get(
        `https://blazing-card-backend-dev.kellton.net/api/customer-card-details/listCard/${userId}`
      );
      const data = response.data.data;
      // console.log(data[0].billing_details);
      // console.log(data[0].card);
      setAddress(data[0].billing_details);
      setCard(data[0].card);
        setCustomerId(data[0].customer);
      setToken(data[0].customer);
      setCardData(data[0]);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(err.response.status);
        console.log(error.response.header);
        // setIsLoading(false);
      } else {
        console.log(`Error: ${error.message}`);
        // setIsLoading(false)
      }
    }
  };


 export const fetchAddress = async (setAddressData) => {
    // addressListApi(setAddressData,setAddressLoader);
    //console.log(`addressListApi res is ${res}`)
    try {
      const response = await axios.get(
        "https://blazing-card-backend-dev.kellton.net/api/address/get-address",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setAddressData(data);
      // console.log(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.header);
        // setIsLoading(false);
      } else {
        console.log(`Error: ${error.message}`);
        // setIsLoading(false)
      }
    }
  };