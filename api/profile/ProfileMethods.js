import http from '../intercept';

let GetPublicProfile = async (userId) => {
    if(userId) {
        const response = await http.get(`customer/get-public-profile/${userId}`);
        if(response && response.data) {
            return response;
        } 
        return false;
    } else {
        return false;
    }
}

let GetScheduledStreams = async (userId) => {
    if(userId) {
        const response = await http.get(`/stream/vendorProfile-scheduled-stream?vendorId=${userId}`);
        if(response && response.data) {
            return response;
        } 
        return false;
    } else {
        return false;
    }
}

let GetPreviousStreams = async (userId) => {
    if(userId) {
        const response = await http.get(`/stream/vendorProfile-previous-stream?vendorId=${userId}`);
        if(response && response.data) {
            return response;
        } 
        return false;
    } else {
        return false;
    }
}

let GetLikedStreams = async (userId) => {
    if(userId) {
        const response = await http.get(`/stream/liked-streams?user_id=${userId}`);
        if(response && response.data) {
            return response;
        } 
        return false;
    } else {
        return false;
    }
}

let GetUserFollowers = async (userId) => {
    if(userId) {
        const response = await http.get(`/follow/get_follower?user_id=${userId}`);
        if(response && response.data && response.status === 200) {
            return response;
        } 
        return false;
    } else {
        return false;
    }
}

let GetUserFollowings = async (userId) => {
    if(userId) {
        const response = await http.get(`/follow/get_following?user_id=${userId}`);
        if(response && response.data) {
            return response.data;
        } 
        return false;
    } else {
        return false;
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