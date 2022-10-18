import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services';

export async function createBid(auctionId, bidderId, bidAmount) {
    const data = JSON.stringify({
        "auction_id":auctionId,
	    "bidder_id":bidderId,
	    "bid_amount":bidAmount
    })
    const result =await APIServices.create('bidding/create',data)
    if(result&&result.data&&result.data.status===1){
        return result.data.message;
    }
    else{
        modalWarning('error',result.data.message);
        return result.data.message;
    }
}

