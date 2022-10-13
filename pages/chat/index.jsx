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
  host,
} from "../../chatService";
import ChatInput from "../../components/chats/components/ChatInput";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import MobileHeader from "../../components/shared/headers/MobileHeader";
import { useDispatch } from "react-redux";
import Router from "next/router";
import { useRouter } from "next/router";
import ProfilePannel from "../../components/partials/Messages/ProfilePannel";
import ChatPannel from "../../components/partials/Messages/ChatPannel";
import { ChatUserModal } from "../../components/partials/Modal/Modal";
import { Loader } from "../../components/reusable/Loader";

export default function Chat() {
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

  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [windowWidth, setWindowWidth] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-current-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-current-user")));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("chat-app-current-user")) {
      let user = JSON.parse(localStorage.getItem("chat-app-current-user"));
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, []);

  const fetchUserData = async () => {
    if (localStorage.getItem("chat-app-current-user")) {
      let user = JSON.parse(localStorage.getItem("chat-app-current-user"));
      const data = await axios.get(allUsersRoute + user._id);
      setContacts(data.data);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: contacts[index]._id,
    });
    setMessages(response.data);
    Router.push("/chat?userId=" + index);
  };

  // // =================================================================

  // // =========================== chat part system ==============================
  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("chat-app-current-user")
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    })

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

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
      return <ChatUserModal setIsOpen={setIsOpen} />;
    }
  };
  // ====================================================================================


  // ======================= profile panel view ========================
  const handleProfilePanel = () => {
    return(
      <>
        <ProfilePannel
            contacts={contacts}
            changeCurrentChat={changeCurrentChat}
            setIsOpen={setIsOpen}
          />
      </>
    )
  }
  // ===================================================================

  // =========================== chat panel view ================================
  const handleChatPanel = () => {
      return(
        <>
          <ChatPannel
            handleSendMsg={handleSendMsg}
            msg={msg}
            messages={messages}
            setMsg={setMsg}
            contactDetail={contacts[currentSelected]}
          />
        </>
      )
    }
  // ============================================================================

  return (
    <>
      {windowWidth <= 1024 ? <MobileHeader /> : <HeaderDefault />}
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
