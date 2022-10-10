import http from '../intercept';

let GetMyProfile = async (userId, callback) => {
    http.get(`customer/get-profile`)
    .then((res) => {
        
    })
    .catch((e) => {
        
    })
}

const MyProfileMethods = {
    GetMyProfile,
}

export default MyProfileMethods;