import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../../api/utils/APIRoutes";
// import { v4 as uuidv4 } from "uuid";
import {
  sendMessageRoute,
  recieveMessageRoute,
} from "../../api/utils/APIRoutes";
import ChatInput from "../../components/chats/components/ChatInput";

export default function Chat() {
  // const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-current-user")) {
      // navigate("/login");
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

  useEffect(async () => {
    if (localStorage.getItem("chat-app-current-user")) {
      let user = JSON.parse(localStorage.getItem("chat-app-current-user"));
      console.log(user.isAvatarImageSet);
      if (user.isAvatarImageSet == true) {
        const data = await axios.get(
          "http://localhost:5000/api/auth/allusers/" + user._id
        );
        setContacts(data.data);
      } else {
        // navigate("/setAvatar");
      }
    }
  }, []);

  // ==================== contact's function =========================

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
  };

  // =================================================================

  // =========================== chat part system ==============================
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
    });

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

  return (
    <>
      <Container>
        <div className="container">
          {currentUserImage && currentUserImage && (
            <Contact>
              <div className="brand">
                {/* <img src={Logo} alt="logo" /> */}
                <h3>snappy</h3>
              </div>
              <div className="contacts">
                {contacts.map((contact, index) => {
                  return (
                    <div
                      key={contact._id}
                      className={`contact ${
                        index === currentChat ? "selected" : ""
                      }`}
                      onClick={() => changeCurrentChat(index)}
                    >
                      <div className="avatar">
                        <img
                          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                          alt=""
                        />
                      </div>
                      <div className="username">
                        <h3>{contact.username}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="current-user">
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h2>{currentUserName}</h2>
                </div>
              </div>
            </Contact>
          )}

          {currentSelected == undefined ? (
            <>
              <Welcome>
                {/* <img src={Robot} alt="" /> */}
                <h1>
                  Welcome, <span>hi!</span>
                </h1>
                <h3>Please select a chat to Start messaging.</h3>
              </Welcome>
            </>
          ) : (
            <>
              <Message>
                <div className="chat-header">
                  <div className="user-details">
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3>{currentChat.username}</h3>
                    </div>
                  </div>
                  {/* <Logout /> */}
                </div>
                <div className="chat-messages">
                  {messages.map((message) => {
                    return (
                      <div ref={scrollRef} >
                        <div
                          className={`message ${
                            message.fromSelf ? "sended" : "recieved"
                          }`}
                        >
                          <div className="content">
                            <p>{message.message}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <ChatInput handleSendMsg={handleSendMsg} />
              </Message>
            </>
          )}
        </div>
      </Container>
    </>
  );
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;


const Contact = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;



const Welcome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

const Message = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
