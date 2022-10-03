import APIServices from "../../services";

async function getStreamingCardDetail(setCardList, setPayLoader) {
  if (sessionStorage.getItem("spurtUser")) {
    const result = await APIServices.getUser(
      "customer-card-details/getCard"
    );
    if (result && result.data && result.data) {
      if (result.status == 200) {
        setCardList(result.data.data);
        setPayLoader(false);
      } else {
        setPayLoader(false);
        // error
      }
    }
  }
}

export { getStreamingCardDetail };
