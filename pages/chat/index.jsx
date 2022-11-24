import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
// import { allUsersRoute, host } from "../../api/utils/APIRoutes";
// import { v4 as uuidv4 } from "uuid";
import IconBack from "../../components/Icons/IconBack";
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
import moment, { utc } from "moment";
import { useIsMobile } from "../../contexts/Devices/CurrentDevices";
import BackButton from "../../components/CommonComponents/BackButton";
import { show } from "../../store/toast/action";
import Error from "../_error";

function Chat({ auth }) {
  // const navigate = useNavigate();
  var router = useRouter();
  const dispatch = useDispatch();
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
  const [isChatPanelVisible, setChatPanelVisible] = useState(false);
  const [errorCode, setErrorcode] = useState(0);

  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const { isMobile } = useIsMobile();

  useEffect(() => {
    if (!!localStorage.getItem("chat-app-current-user")) {
      let user = JSON.parse(localStorage.getItem("chat-app-current-user"));
      socket.current = io(host);
      socket.current.emit("add-user", user?._id);
    } else {
      setErrorcode(404);
    }
  }, []);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg, time) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg,
          time: moment().utc(time).local().format("HH:mm"),
        });
      });
    }
  }, []);
  useEffect(() => {
    fetchUserData();
    chatSocketInitializer();
  }, []);

  const chatSocketInitializer = async () => {
    const user = JSON.parse(localStorage.getItem("chat-app-current-user"))?._id;
    if (user) {
      socket.current.on(`fetch-friend`, async (data) => {
        if (data?.friendId == user) {
          await fetchUserData();
        }
      });
    }
  };

  // ============================== fetch frend list ===================================
  const fetchUserData = async () => {
    if (localStorage.getItem("chat-app-current-user")) {
      let user = JSON.parse(localStorage.getItem("chat-app-current-user"))?._id;
      const token = localStorage.getItem("blazingToken");
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
        .catch((err) => {
          dispatch(
            show({
              message: err.response?.data?.message,
              type: "error",
            })
          );
        });
    }
  };

  // =====================================================================================

  // // ==================== contact's function =========================
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("chat-app-current-user"));
    if (data) {
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    }
  }, []);
  const changeCurrentChat = async (index) => {
    const data = JSON.parse(localStorage.getItem("chat-app-current-user"));
    setCurrentSelected(index);
    setCurrentChat(contacts[index]);
    const token = localStorage.getItem("blazingToken");
    const response = await axios.post(
      recieveMessageRoute,
      {
        from: data?._id,
        to: contacts[index]._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMessages(response.data.response);
  };
  // // =================================================================

  // // =========================== send message ==============================
  const handleSendMsg = async (msg) => {
    const messageTime = moment().utc().format("HH:mm");
    const data = await JSON.parse(
      localStorage.getItem("chat-app-current-user")
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data?._id,
      msg,
      messageTime,
    });
    const token = localStorage.getItem("blazingToken");
    await axios.post(
      sendMessageRoute,
      {
        from: data?._id,
        to: currentChat._id,
        message: msg,
        messageTime: messageTime,
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
    return (
      <>
        <ProfilePannel
          contacts={contacts}
          changeCurrentChat={changeCurrentChat}
          setIsOpen={setIsOpen}
          userCount={userCount}
          setChatPanelVisible={setChatPanelVisible}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
        />
      </>
    );
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
            setIsOpen={setIsOpen}
          />
        </>
      );
    }
  };
  // ============================================================================


  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <>
      {isMobile ? (
        <>
          {isChatPanelVisible ? (
            <div className="header-title flex flex-center">
              <h3 className="flex flex-center">
                <div
                  className="edit-back"
                  onClick={(e) => {
                    e.preventDefault();
                    setChatPanelVisible(false);
                  }}
                >
                  <IconBack />
                </div>
                Message
              </h3>
            </div>
          ) : (
            <div className="header-title flex flex-center">
              <BackButton name={"Message"} />
            </div>
          )}
        </>
      ) : (
        <HeaderDefault />
      )}
      <div className="messages-wrapper">
        {!isMobile ? <h1>Messages</h1> : ""}
        <div className="flex space-between message-inner">
          {isMobile ? (
            <>{isChatPanelVisible ? handleChatPanel() : handleProfilePanel()}</>
          ) : (
            <>
              {handleProfilePanel()} {handleChatPanel()}
            </>
          )}
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
