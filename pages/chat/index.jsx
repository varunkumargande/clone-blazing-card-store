import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import IconBack from "../../components/Icons/IconBack";
import { recieveMessageRoute, friendList, host } from "../../chatService";
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
import { useChatCurrentUser } from "../../hooks/useChatCurrentUser";
import { sendMessage, getFriendList, getMessage } from "../../api/chat";
import { fetchUserChatNotification } from "../../store/chat/action";
import { getChatNotification } from "../../api/chat";

function Chat({ auth }) {
  // const navigate = useNavigate();
  var router = useRouter();
  const dispatch = useDispatch();
  const socket = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userCount, setUserCount] = useState(null);
  const [isChatPanelVisible, setChatPanelVisible] = useState(false);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newNotification, setNewNotification] = useState([]);
  const [msgNotificationData, setMsgNotificationData] = useState([]);
  const [exp, setExp] = useState(true);
  const [currentUserData] = useChatCurrentUser();
  const { isMobile } = useIsMobile();
  const [queryUserIndex, setQueryUserIndex] = useState(null);

  useEffect(() => {
    socket.current = io(host);
    if (socket.current) {
      if (!!currentUserData) {
        socket.current.emit("add-user", currentUserData?._id);
      } else {
        setErrorcode(404);
      }
    }
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg, time, from, userData) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg,
          isRead: false,
          fromUser: userData,
          time,
        });
      });
      socket.current.on("new-message-notification", (id) => {
        setNewNotification((data) => data.concat(id));
      });
    }
  }, []);

  useEffect(() => {
    fetchUserData();
    chatSocketInitializer();
    getChatNotification(setMsgNotificationData);
  }, []);

  useEffect(() => {
    if (router.query?.chatUserId && contacts.length) {
      const queryUserIndex = contacts.findIndex((contact) => contact?._id === router.query?.chatUserId);
      if (queryUserIndex >= 0) {
        setQueryUserIndex(queryUserIndex);
      }
    }
  }, [contacts])

  const chatSocketInitializer = async () => {
    const user = currentUserData?._id;
    if (user) {
      if (socket.current) {
        socket.current.on(`fetch-friend`, async (data) => {
          if (data?.friendId == user) {
            await fetchUserData();
          }
        });
      }
    }
  };

  // ============================== fetch frend list ===================================
  const fetchUserData = async () => {
    if (currentUserData) {
      getFriendList(setContacts, setUserCount, dispatch);
    }
  };
  // =====================================================================================

  // // ==================== contact's function =========================
  const changeCurrentChat = async (index) => {
    if (socket.current) {
      socket.current.emit(
        "add-chat-currentUser",
        currentUserData?._id,
        contacts[index]._id
      );
      setCurrentSelected(index);
      setCurrentChat(contacts[index]);
      getMessage(setMessages, contacts, index);
    }
  };
  // // =================================================================

  // // =========================== send message ==============================
  const handleSendMsg = async (msg) => {
    const messageTime = moment().utc();
    if (socket.current) {
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUserData?._id,
        isRead: false,
        msg,
        messageTime,
      });

      let sendMessageData = {
        from: currentUserData?._id,
        to: currentChat._id,
        message: msg,
        messageTime: messageTime,
        isRead: false,
      };
      sendMessage(sendMessageData);
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg, time: moment().format() });
      setMessages(msgs);
    }
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
          socket={socket.current}
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
          newNotification={newNotification}
          setNewNotification={setNewNotification}
          notificationData={msgNotificationData}
          setNotificationData={setMsgNotificationData}
          queryChatUserId={router?.query?.chatUserId}
          queryChatUserIndex={queryUserIndex}
        />
      </>
    );
  };
  // ===================================================================

  // =========================== chat panel view ================================
  const handleChatPanel = () => {
    return (
      <>
        <ChatPannel
          handleSendMsg={handleSendMsg}
          msg={msg}
          messages={messages}
          setMsg={setMsg}
          contactDetail={!!contacts && contacts[currentSelected]}
          setIsOpen={setIsOpen}
        />
      </>
    );
  };
  // ============================================================================

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
            <>
              {!contacts?.length ? (
                handleChatPanel()
              ) : (
                <>
                  {!isChatPanelVisible
                    ? handleProfilePanel()
                    : handleChatPanel()}
                </>
              )}
            </>
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
