import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services';

export async function getToken(token, channel, uid, tokentype, role) {
    const result =await APIServices.get(`stream/getStreamToken?token=${token}&channel=${channel}&uid=${uid}&tokentype=${tokentype}&role=${role}`)
    if(result&&result.data&&result.data.status===1){
        modalSuccess('success',result.data.message)
        return result.data.rtmToken
    }
    else{
        modalWarning('error',result.data.message);
    }
}

