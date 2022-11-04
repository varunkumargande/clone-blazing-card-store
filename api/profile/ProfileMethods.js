import http from '../intercept';

let GetPublicProfile = async (userId, callback, loggedInUser = false) => {
    let url = `customer/get-public-profile/${userId}`;
    if(loggedInUser) {
        url += "?loggedIn=" + loggedInUser;
    }
    http.get(url)
    .then((res) => {
        functionCallbackSetter(res, callback);
    })
    .catch((e) => {
        
    })
}

let GetScheduledStreams = async (userId, callback) => {
    http.get(`/stream/vendorProfile-scheduled-stream?vendorId=${userId}`)
    .then((res) => {
        functionCallbackSetter(res, callback);
    })
    .catch((e) => {
        
    })
}

let GetPreviousStreams = async (userId, callback) => {
    http.get(`/stream/vendorProfile-previous-stream?vendorId=${userId}`)
    .then((res) => {
        functionCallbackSetter(res, callback);
    })
    .catch((e) => {
        
    })
}

let GetLikedStreams = (userId, callback) => {
    http.get(`/stream/liked-streams?user_id=${userId}`)
    .then((res) => {
        functionCallbackSetter(res, callback);
    })
    .catch((e) => {
        
    })
}

let GetUserFollowers = async (userId, callback) => {
    http.get(`/follow/get_follower?user_id=${userId}`)
    .then((res) => {
        functionCallbackSetter(res, callback);
    })
    .catch((e) => {
        
    })
}

let GetUserFollowings = async (userId, callback) => {
    http.get(`/follow/get_following?user_id=${userId}`)
    .then((res) => {
        functionCallbackSetter(res, callback);
    })
    .catch((e) => {
        
    })
}

let UserFollowUser = (userId, followerId,callback, setIsOpenFollowUnfollow) => {
    http.post('follow/follow_unfollow', {
        "following_id" : followerId,
        "follower_id" : userId
    })
    .then((res) => {
        if(res?.data?.data?.isFollow === false){
           setIsOpenFollowUnfollow(false) 
        }
        callback(Math.floor((Math.random() * 100) + 1));
    })
    .catch((error) => {
        
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
    GetUserFollowings,
    UserFollowUser
}

export default ProfileMethods;