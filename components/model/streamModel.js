import React from "react";
import * as cryptoJs from "crypto-js";
import { imageUrl } from "../../api/url";
import { io } from "socket.io-client";

class StreamDetailModel {
  constructor(streamData) {
    if (!!streamData) {
      this.streamPageDteails = this.getStreamPageData(streamData);
      this.option = this.getAgoraClientOptions(this.streamPageDteails);
    }
  }

  getStreamPageData(streamData) {
    const userDetails = JSON.parse(sessionStorage.getItem("spurtUser"));
    var bytes = cryptoJs.AES.decrypt(streamData?.streamAPPID, 'ff20a253698574300fe4c77abfd5c18ff65367a8');
    var appId = bytes.toString(cryptoJs.enc.Utf8);
    let streamDetails = {
      sellerName: streamData?.vendorDetails?.username,
      loggedInUserName: "Guest",
      loggedInUserId: Math.floor(Math.random() * 20),
      uuid: streamData?.uuid,
      title: streamData?.title,
      description: streamData?.description,
      defaultMute: streamData?.isMute,
      isExplicite: streamData?.isExplicite,
      streamChannel: streamData?.vendorDetails?.stream_channel,
      notificationChannel: streamData?.vendorDetails?.notification_channel,
      messageChannel: streamData?.vendorDetails?.message_channel,
      agoraAppId: appId,
      scheduleDate: streamData?.scheduleDate,
      scheduleTime:  streamData?.scheduletime,
      isLoggedIn: false,
      avatarImage : userDetails?.avatar ? imageUrl + "?path=" + userDetails?.avatarPath + "&name=" + userDetails?.avatar + "&width=50&height=50" : "/static/img/no-image.png",
      socketObject: io(process.env.SOCKET_IO_PATH)
    }
    if (!!userDetails) {
      streamDetails.loggedInUserName = userDetails?.firstName;
      streamDetails.loggedInUserId = userDetails?.id;
      streamDetails.isLoggedIn= true
    }
    return streamDetails;
  }

  getAgoraClientOptions(data) {
    return {
      appId: data.agoraAppId,
      streamChannel: data.streamChannel,
      notificationChannel: data.notificationChannel,
      messageChannel: data.messageChannel,
      audience: data.loggedInUserName,
      audienceId: data.loggedInUserId,
      userType: 'audience',
      accountType: 'userAccount',
      rtc: 'RTC',
      rtm: 'RTM',
    }
  }

}
export default StreamDetailModel;
