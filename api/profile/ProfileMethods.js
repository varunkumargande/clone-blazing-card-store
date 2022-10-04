import http from '../intercept';

let GetPublicProfile = async (userId, callback) => {
    http.get(`customer/get-public-profile/${userId}`)
    .then((res) => {
        functionCallbackSetter(res, callback);
    })
    .catch((e) => {
        console.log(e.response);
    })
}

let GetScheduledStreams = async (userId, callback) => {
    http.get(`/stream/vendorProfile-scheduled-stream?vendorId=${userId}`)
    .then((res) => {
        functionCallbackSetter(res, callback);
    })
    .catch((e) => {
        console.log(e.response);
    })
}

let GetPreviousStreams = async (userId, callback) => {
    http.get(`/stream/vendorProfile-previous-stream?vendorId=${userId}`)
    .then((res) => {
        functionCallbackSetter(res, callback);
    })
    .catch((e) => {
        console.log(e.response);
    })
}

let GetLikedStreams = (userId, callback) => {
    http.get(`/stream/liked-streams?user_id=${userId}`)
    .then((res) => {
        functionCallbackSetter(res, callback);
    })
    .catch((e) => {
        console.log(e.response);
    })
}

let GetUserFollowers = async (userId, callback) => {
    http.get(`/follow/get_follower?user_id=${userId}`)
    .then((res) => {
        functionCallbackSetter(res, callback);
    })
    .catch((e) => {
        console.log(e.response);
    })
}

let GetUserFollowings = async (userId, callback) => {
    http.get(`/follow/get_following?user_id=${userId}`)
    .then((res) => {
        functionCallbackSetter(res, callback);
    })
    .catch((e) => {
        console.log(e.response);
    })
}

let functionCallbackSetter = (response, callback) => {
    if (response && response.status == 200) {
        if (response.data.data) {
            callback(response.data.data);
        } else {
            callback([]);
        }
    }
}

const ProfileMethods = {
    GetPublicProfile,
    GetScheduledStreams,
    GetPreviousStreams,
    GetLikedStreams,
    GetUserFollowers,
    GetUserFollowings
}

export default ProfileMethods;