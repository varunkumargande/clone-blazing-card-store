import http from '../intercept';

let GetMyProfile = async (userId, callback) => {
    http.get(`customer/get-profile`)
    .then((res) => {
        console.log(res)
    })
    .catch((e) => {
        console.log(e.response);
    })
}

const MyProfileMethods = {
    GetMyProfile,
}

export default MyProfileMethods;