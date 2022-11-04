import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
// import { allUsersRoute, host } from "../../api/utils/APIRoutes";
// import { v4 as uuidv4 } from "uuid";
import {
  sendMessageRoute,
  recieveMessageRoute,
  allUsersRoute,
  friendList,
  host,
} from "../../chatService";
import ChatInput from "../../components/chats/components/ChatInput";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import MobileHeader from "../../components/shared/headers/MobileHeader";
import { useDispatch, connect } from "react-redux";
import Router from "next/router";
import { useRouter } from "next/router";
import ProfilePannel from "../../components/partials/Messages/ProfilePannel";
import ChatPannel from "../../components/partials/Messages/ChatPannel";
import { ChatUserModal } from "../../components/partials/Modal/Modal";
import { Loader } from "../../components/reusable/Loader";
import moment from "moment";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";

function Chat({ auth }) {
  // const navigate = useNavigate();
  var router = useRouter();
  const socket = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [userIndex, setUserIndex] = useState([]);
  const [msg, setMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userCount, setUserCount] = useState(null);

  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const { isMobile } = useIsMobile();

  useEffect(() => {
    if (!localStorage.getItem("chat-app-current-user") || !auth?.isLoggedIn) {
      Router.push("/");
    }
  }, []);

  useEffect(() => {
    if (!!localStorage.getItem("chat-app-current-user")) {
      let user = JSON.parse(localStorage.getItem("chat-app-current-user"));
      socket.current = io(host);
      socket.current.emit("add-user", user?.user?._id);
    }
  }, []);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    fetchUserData();
    chatSocketInitializer();
  }, []);

  const chatSocketInitializer = async () => {
    socket.current.on(`fetch-friend`, async (data) => {
      let user = JSON.parse(localStorage.getItem("chat-app-current-user"))?.user
        ?._id;
      if (data?.friendId == user) {
        await fetchUserData();
      }
    });
  };

  // ============================== fetch frend list ===================================
  const fetchUserData = async () => {
    if (localStorage.getItem("chat-app-current-user")) {
      let user = JSON.parse(localStorage.getItem("chat-app-current-user"))?.user
        ?._id;
      const token = sessionStorage.getItem("blazingToken");
      let userId = {
        userId: user,
      };
      const chatHeader = {
        Authorization: `Bearer ${token}`,
      };
      const data = await axios
        .post(friendList, userId, {
          headers: chatHeader,
        })
        .then((res) => {
          setContacts(res?.data?.response?.data);
          setUserCount(res?.data?.response?.userCount);
        })
        .catch((err) => {});
    }
  };

  // =====================================================================================

  // // ==================== contact's function =========================
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("chat-app-current-user"));
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = async (index) => {
    const data = JSON.parse(localStorage.getItem("chat-app-current-user"));
    setCurrentSelected(index);
    setCurrentChat(contacts[index]);
    const token = sessionStorage.getItem("blazingToken");
    const response = await axios.post(
      recieveMessageRoute,
      {
        from: data?.user?._id,
        to: contacts[index]._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMessages(response.data.response);
    Router.push("/chat?userId=" + index);
  };
  // // =================================================================

  // // =========================== send message ==============================
  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("chat-app-current-user")
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data?.user?._id,
      msg,
    });
    const token = sessionStorage.getItem("blazingToken");
    await axios.post(
      sendMessageRoute,
      {
        from: data?.user?._id,
        to: currentChat._id,
        message: msg,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg, time: moment().format("HH:mm") });
    setMessages(msgs);
  };

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // ===========================================================================

  // ========================= open modal for find the user =============================
  const chatUserFind = () => {
    if (isOpen) {
      return (
        <ChatUserModal
          setIsOpen={setIsOpen}
          fetchUserData={fetchUserData}
          socket={socket}
        />
      );
    }
  };
  // ====================================================================================

  // ======================= profile panel view ========================
  const handleProfilePanel = () => {
    // if (contacts) {
    return (
      <>
        <ProfilePannel
          contacts={contacts}
          changeCurrentChat={changeCurrentChat}
          setIsOpen={setIsOpen}
          userCount={userCount}
        />
      </>
    );
    // }
  };
  // ===================================================================

  // =========================== chat panel view ================================
  const handleChatPanel = () => {
    if (!!contacts) {
      return (
        <>
          <ChatPannel
            handleSendMsg={handleSendMsg}
            msg={msg}
            messages={messages}
            setMsg={setMsg}
            contactDetail={contacts[currentSelected]}
          />
        </>
      );
    }
  };
  // ============================================================================

  return (
    <>
      {isMobile ? <MobileHeader /> : <HeaderDefault />}
      <div className="messages-wrapper">
        <h1>Messages</h1>
        <div className="flex space-between message-inner">
          {handleProfilePanel()}
          {handleChatPanel()}
          {chatUserFind()}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Chat);
