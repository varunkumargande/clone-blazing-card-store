import http from "../intercept";

let GetPublicProfile = async (userId, callback, loggedInUser = false) => {
  let url = `customer/get-public-profile/${userId}`;
  if (loggedInUser) {
    url += "?loggedIn=" + loggedInUser;
  }
  http
    .get(url)
    .then((res) => {
      functionCallbackSetter(res, callback);
    })
    .catch((e) => {});
};

let GetScheduledStreams = async (userId, callback) => {
  http
    .get(`/stream/vendorProfile-scheduled-stream?vendorId=${userId}`)
    .then((res) => {
      functionCallbackSetter(res, callback);
    })
    .catch((e) => {});
};

let GetPreviousStreams = async (userId, callback) => {
  http
    .get(`/stream/vendorProfile-previous-stream?vendorId=${userId}`)
    .then((res) => {
      functionCallbackSetter(res, callback);
    })
    .catch((e) => {});
};

let GetLikedStreams = (userId, callback, setLoader) => {
  http
    .get(`/stream/liked-streams?user_id=${userId}`)
    .then((res) => {
      functionCallbackSetter(res, callback);
      setLoader(false);
    })
    .catch((e) => {
      setLoader(false);
    });
};

const GetUserFollowers = async (userId, callback, loggedInUserId) => {
  http
    .get(`/follow/get_follower?user_id=${userId}&own_id=${loggedInUserId}`)
    .then((res) => {
      functionCallbackSetter(res, callback);
    })
    .catch((e) => {});
};

const GetUserFollowings = async (userId, callback, loggedInUserId) => {
  if (!!loggedInUserId) {
    http
      .get(`/follow/get_following?user_id=${userId}&own_id=${loggedInUserId}`)
      .then((res) => {
        functionCallbackSetter(res, callback);
      })
      .catch((e) => {});
  }
};

const UserFollowUser = (
  userId,
  followerId,
  callback,
  setIsOpenFollowUnfollow
) => {
  http
    .post("follow/follow_unfollow", {
      following_id: followerId,
      follower_id: userId,
    })
    .then((res) => {
      if (res?.data?.data?.isFollow === false) {
        setIsOpenFollowUnfollow(false);
      }
      callback(Math.floor(Math.random() * 100 + 1));
    })
    .catch((error) => {});
};

const FollowUser = (
  userId,
  followerId,
  setFollowing,
  following,
  setIsOpenFollowUnfollow,
  pathname
) => {
  http
    .post("follow/follow_unfollow", {
      following_id: followerId,
      follower_id: userId,
    })
    .then((res) => {
      if (res?.status === 200) {
        if (res?.data?.data?.isFollow === false) {
          const followingReplica = [...following];
          if (pathname === "/account/myprofile") {
            const index = followingReplica.findIndex(
              (element) =>
                (element.following_id ?? element.f_follower_id) === followerId
            );
            followingReplica.splice(index, 1);
            setFollowing(followingReplica);
            setIsOpenFollowUnfollow(false);
          } else if (pathname === "/profile") {
            const index = followingReplica.findIndex(
              (element) =>
                (element.following_id ?? element.f_follower_id) === followerId
            );
            followingReplica[index].is_user_followed = 0;
            setFollowing(followingReplica);
            setIsOpenFollowUnfollow(false);
          }
        }
        if (res?.data?.data?.isFollow === true) {
          const followingReplica = [...following];
          const index = followingReplica.findIndex(
            (element) =>
              (element.following_id ?? element.f_follower_id) === followerId
          );
          followingReplica[index].is_user_followed = 1;
          setFollowing(followingReplica);
        }
      }
    })
    .catch((error) => {});
};

let functionCallbackSetter = (response, callback) => {
  if (response && response.status == 200) {
    if (response.data.data) {
      callback(response.data.data);
    } else {
      callback([]);
    }
  }
};

const ProfileMethods = {
  GetPublicProfile,
  GetScheduledStreams,
  GetPreviousStreams,
  GetLikedStreams,
  GetUserFollowers,
  GetUserFollowings,
  UserFollowUser,
  FollowUser,
};

export default ProfileMethods;
