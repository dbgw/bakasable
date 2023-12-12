import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import {
  BlocAdminContent,
  ChatSpace,
  LoadingMessage,
} from "../../../assets/styles/adminStyle/adminGlobalStyle";
import DashboardContent from "../../../components/dashboardContent";
import DashboardSide from "../../../components/dashboardSide";
import ListMessagerie from "../../../components/listMessagerie";
import AdminBase from "../../../theme/back/adminBase";
import { Input } from "../../../components/ui";
import {
  ClipIcon,
  DeleteCloseIcon,
  SendIcon,
  ErrorIcon,
} from "../../../assets/styles/icons";
import { useMediaQuery } from "react-responsive";
import CloseButton from "../../../components/ui-elements/closeButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getPathImage,
  getUniqueItemsByProperties,
  uniqid,
} from "../../../helper/functions";
import moment from "moment";
import connector from "../../../connector";
import endPoints from "../../../config/endPoints";
import MercureSubscriber from "@cerati/react-mercure";
import {
  UPDATE_MESSAGE_IN_THREADS,
  UPDATE_USER_IN_THREADS,
} from "../../../store/functions/actionTypes";
import ROUTES from "../../../config/routes";
import { ROLES } from "../../../vars";
import { FileIcon, defaultStyles } from "react-file-icon";
import { getAllThreads } from "../../../store/functions/threadActions";

export default withRouter(function Messagerie({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const thread = useSelector((state) => state.thread);
  const auth = useSelector((state) => state.auth);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [now, setNow] = useState(new Date());
  const [chatFiles, setChatFiles] = useState([]);
  const [otherUser, setOtherUser] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [state, setState] = useState({
    activeItem: false,
    message: {
      label: "Répondre...",
      placeholder: "Ecrire ici...",
      as: "textarea",
      value: "",
    },
  });

  useEffect(() => {
    if (thread.threads) {
      if (match.params.id) {
        thread.threads.forEach((th) => {
          if (parseInt(th.id) === parseInt(match.params.id)) {
            setState({ ...state, activeItem: th });
          }
        });
      } else if (!match.params.id) {
        const threads = thread.threads.sort(orderMessages);
        if (threads.length) {
          setState({ ...state, activeItem: threads[0] });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thread.threads, match.params.id]);

  useEffect(() => {
    if (thread.threads && state.activeItem) {
      thread.threads.map((th) => {
        if (th.id === state.activeItem.id) {
          const container = document.getElementById("messages-container");
          const shouldScroll =
            container &&
            container.scrollTop + container.clientHeight ===
              container.scrollHeight;
          setMessages(th.messages);
          if (shouldScroll) setTimeout(() => scrollChat(), 400);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thread.threads]);

  useEffect(() => {
    const container = document.getElementById("messages-container");
    const shouldScroll =
      container &&
      container.scrollTop + container.clientHeight === container.scrollHeight;
    if (thread.threads && state.activeItem) {
      setMessages(
        thread.threads.find((th) => th.id === state.activeItem.id).messages
      );
      setOtherUser(state.activeItem.users.find((us) => us.id !== auth.user.id));
      history.push(`${ROUTES.MESSAGERIE.url}/${state.activeItem.id}`);
    }
    if (shouldScroll) setTimeout(() => scrollChat(), 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeItem]);

  useEffect(() => {
    imTyping();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.message.value]);
  useEffect(() => {
    setInterval(() => setNow(new Date()), 15000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (
      state.activeItem &&
      (state.message.value.length || chatFiles.filter((fl) => fl.file).length)
    ) {
      const data = {
        text: state.message.value,
        thread: state.activeItem["@id"],
        files: chatFiles.map((fl) => fl.file),
      };
      connector({
        url: endPoints.MESSAGES,
        method: "post",
        data: data,
        success: (response) => {
          setState({ ...state, message: { ...state.message, value: "" } });
          setChatFiles([]);
          if (state.activeItem.messages.length === 0) {
            dispatch(getAllThreads());
          }
          //console.log(response);
        },
        catch: (err) => console.log(err),
      });
    }
  };

  const otherIsTyping = (payload) => {
    if (state.activeItem && payload.type === "typing" && payload.length) {
      const container = document.getElementById("messages-container");
      const shouldScroll =
        container &&
        container.scrollTop + container.clientHeight === container.scrollHeight;
      setTyping({ user: payload.user });
      if (shouldScroll) setTimeout(() => scrollChat(), 400);
    } else setTyping(false);
  };

  const imTyping = () => {
    if (state.activeItem)
      connector({
        url: endPoints.MESSAGES_TYPING,
        method: "post",
        data: {
          length: state.message.value.trim().length,
          thread: state.activeItem.id,
        },
        success: (response) => {
          //console.log(response);
        },
        catch: (err) => console.log(err),
      });
  };

  const scrollChat = () => {
    const container = document.getElementById("messages-container");
    if (container) container.scrollTop = container.scrollHeight;
  };

  const stillActive = (date) => {
    const diff = moment(date).diff(now, "second") * -1;
    return diff <= 30 ? (
      <span className="online">En Ligne</span>
    ) : moment(date).isValid() ? (
      <span className="offline">
        Vu pour la dernière fois{" "}
        {moment(date).locale("fr").calendar().toLowerCase()}
      </span>
    ) : (
      ""
    );
  };

  const orderMessages = (a, b) => {
    const aLastMessage = a.messages.at(-1);
    const bLastMessage = b.messages.at(-1);
    if (aLastMessage && bLastMessage) {
      const aDateLastMessage = moment(aLastMessage.createdAt);
      const bDateLastMessage = moment(bLastMessage.createdAt);
      if (aDateLastMessage.isBefore(bDateLastMessage)) return 1;
      return -1;
    }
    return 0;
  };

  const saveFiles = () => {
    let cpChatFiles = [...chatFiles];
    const files = document.getElementById("files_chat");
    for (var i = 0; i < files.files.length; ++i) {
      const id = uniqid();
      cpChatFiles.push({
        id: id,
        name: files.files.item(i).name,
        file: false,
        htmlFile: files.files.item(i),
        load : true,
        error : false,
      });
    }
    document.getElementById("files_chat").value = "";
    setChatFiles(cpChatFiles);
    for (var i = 0; i < cpChatFiles.length; ++i) {
      const data = new FormData();
      data.append("type", "alltypes");
      data.append("file", cpChatFiles[i].htmlFile);
      const id = cpChatFiles[i].id;
      connector({
        method: "post",
        url: endPoints.ANONYMOUS_MEDIA_OBJECT,
        data,
        success: (response) => {
          cpChatFiles = cpChatFiles.map((fl) =>
            fl.id === id ? { ...fl, file: response.data.contentUrl, load: false } : fl
          );
          setChatFiles(cpChatFiles);
        },
        catch: (error) => {
          console.log(error);
          var msg = "Ce fichier n'a pas pu être upload!";
          if (error.response.data["hydra:description"] !== undefined) {
            msg = error.response.data["hydra:description"];
          }
          cpChatFiles = cpChatFiles.map((fl) =>
            fl.id === id ? { ...fl, load: false, error : msg } : fl
          );
          setChatFiles(cpChatFiles);
        },
      });
    }
  };

  const removeFile = (image) => {
    if (image) {
      image = image.replace("/media/", "");
      connector({
        method: "delete",
        url: `${endPoints.ANONYMOUS_DELETE_MEDIA_OBJECT}/${image}`,
        success: (response) => {},
        catch: (error) => {
          console.log(error);
        },
      });
    }
  };

  return (
    <AdminBase>
      <BlocAdminContent>
        <DashboardContent titlePage="Messagerie" className="messagerie-content">
          {state.activeItem ? (
            <>
              <MercureSubscriber
                hub={`${process.env.REACT_APP_MERCURE_URL}/.well-known/mercure`}
                topics={[
                  `${process.env.REACT_APP_API_URI}/${state.activeItem.id}`,
                ]}
                update={(payload) => otherIsTyping(payload)}
                json
              />
              {otherUser && (
                <MercureSubscriber
                  hub={`${process.env.REACT_APP_MERCURE_URL}/.well-known/mercure`}
                  topics={[
                    `${process.env.REACT_APP_API_URI}/lastseen${otherUser.id}`,
                  ]}
                  update={(payload) => {
                    if (payload.type === "lastseen") {
                      setOtherUser(payload.user);
                      dispatch({
                        type: UPDATE_USER_IN_THREADS,
                        user: payload.user,
                      });
                    }
                  }}
                  json
                />
              )}

              <ChatSpace>
                <div className="head-space-chat">
                  <p className="name-chat-space">{getNameUser(otherUser)}</p>
                  {stillActive(otherUser.lastSeen)}
                  {isMobile && (
                    <>
                      <CloseButton
                        onClick={(e) => {
                          e.preventDefault();
                          const cpState = { ...state };
                          cpState.activeItem = false;
                          setState(cpState);
                        }}
                      />
                    </>
                  )}
                </div>
                <div
                  className={`content-space-chat ${
                    typing && typing.user.id !== auth.user.id
                      ? "show-typing"
                      : ""
                  }`}
                  id="messages-container"
                >
                  {getUniqueItemsByProperties(messages, ["id"]).map(
                    (message) => (
                      <SingleMessage
                        message={message}
                        key={message.id}
                        messageUpdate={(message) =>
                          dispatch({
                            type: UPDATE_MESSAGE_IN_THREADS,
                            thread: state.activeItem.id,
                            message: message,
                          })
                        }
                      />
                    )
                  )}
                  {typing && typing.user.id !== auth.user.id && (
                    <div className="d-flex justify-content-start mb-4 is-teyping">
                      <div className="img_cont_msg">
                        {typing.user.picture ? (
                          <img
                            src={getPathImage(typing.user.picture)}
                            alt={getNameUser(typing.user)}
                            className="user_img_msg"
                          />
                        ) : getNameUser(typing.user,true) }
                      </div>
                      <div className="msg_cotainer">
                        <div className="content-msg">
                          <span className="name-msg">
                            { getNameUser(typing.user)} 
                          </span>
                          <LoadingMessage>
                            <li></li>
                            <li></li>
                            <li></li>
                          </LoadingMessage>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="keyboard-chat">
                  <div className="bloc-keyboard">
                    <form onSubmit={sendMessage}>
                      <Input
                        {...state.message}
                        subtitle="Veillez à préciser la référence du devis ou de la commande concernée afin de faciliter les échanges"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            sendMessage(e);
                          }
                        }}
                        onChange={(e) => {
                          const cpState = { ...state };
                          cpState.message.value = e.target.value;
                          setState(cpState);
                        }}
                        optionChat={
                          <div className="btn-action-keyboard">
                            <input
                              type="file"
                              name="files[]"
                              onChange={() => {
                                saveFiles();
                              }}
                              id="files_chat"
                              multiple
                              style={{ display: "none" }}
                            />
                            <label
                              htmlFor="files_chat"
                              className="btn-clip"
                              style={{ cursor: "pointer" }}
                            >
                              <ClipIcon />
                            </label>
                            <button className="btn-send">
                              <SendIcon />
                            </button>
                          </div>
                        }
                      />
                    </form>
                  </div>
                  <div className="chat-files">
                    {chatFiles.map((file, index) => (
                      <div
                        key={index}
                        className="chat-file"
                        style={{
                          opacity: file.file ? "1" : "0.7",
                        }}
                      >
                        <p>
                          <div>
                            {file.load && (<div className="lds-dual-ring"></div>)}
                           {file.error && ( <div className="error-upload"><ErrorIcon />
                              <span>{file.error}</span>
                            </div>)}
                            {!file.error && !file.load && (<FileIcon
                              extension={file.name.split(".").pop()}
                              {...(defaultStyles[file.name.split(".").pop()] ||
                                {})}
                            />)}
                          </div>
                          <span className="name-file-chat">{file.name}</span>
                        </p>
                        <button
                          onClick={() => {
                            removeFile(file.file);
                            setChatFiles(
                              chatFiles.filter((fl) => fl.id !== file.id)
                            );
                          }}
                        >
                          <DeleteCloseIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </ChatSpace>
            </>
          ) : null}
        </DashboardContent>
        <DashboardSide className="side-message">
          <ListMessagerie
            data={thread.threads ? thread.threads.sort(orderMessages) : false}
            state={state}
            setState={setState}
            now={now}
            getNameUser={getNameUser}
          />
        </DashboardSide>
      </BlocAdminContent>
    </AdminBase>
  );
});

function getNameUser(row, prefix = false) {
  if (
    row &&
    Array.isArray(row.roles) &&
    row.firstName !== undefined &&
    row.lastName !== undefined &&
    row.enterprise !== undefined
  ) {
    if (prefix) {
      return row.roles.includes(ROLES.ROLE_CLIENT)
        ? `${row.firstName.charAt(0)}${row.lastName.charAt(0)}`
        : `${row.enterprise.substring(0, 2)}`;
    } else {
      return row.roles.includes(ROLES.ROLE_CLIENT)
        ? `${row.firstName} ${row.lastName}`
        : `${row.enterprise}`;
    }
  }
  return;
};

function SingleMessage({ message, messageUpdate = () => {} }) {
  const ref = useRef();
  const auth = useSelector((state) => state.auth);
  const isVisible = useOnScreen(ref);
  useEffect(() => {
    if (isVisible && !message.seen && message.user.id !== auth.user.id) {
      connector({
        url: `${endPoints.MESSAGES}/${message.id}`,
        method: "PUT",
        data: { seen: true },
        success: (response) => {
          messageUpdate({ ...message, seen: true });
        },
        catch: (err) => console.log(err),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  if (parseInt(auth.user.id) === parseInt(message.user.id))
    return (
      <div className="d-flex justify-content-end mb-5" ref={ref}>
        <div className="msg_cotainer support-cotainer">
          <div className="content-msg">
            <span className="name-msg">Moi</span>
            {message.text}
            <div>
              {message.files &&
                message.files.map(
                  (fl, index) =>
                    fl && (
                      <a
                        target="_blank"
                        href={getPathImage(fl)}
                        download
                        key={index}
                      >
                        {fl.split("/").pop()}
                      </a>
                    )
                )}
            </div>
          </div>
          <span className="msg_time">
            {moment(message.createdAt).locale("fr").calendar()}
          </span>
        </div>
      </div>
    );
  return (
    <div className="d-flex justify-content-start mb-5" ref={ref}>
      <div className="img_cont_msg">
        {message.user.picture ? (
          <img
            src={getPathImage(message.user.picture)}
            alt={getNameUser(message.user)}
            className="user_img_msg"
          />
        ) : getNameUser(message.user, true) }
      </div>
      <div className="msg_cotainer">
        <div className="content-msg">
          <span className="name-msg">{getNameUser(message.user)}</span>
          {message.text}
          <div>
            {message.files &&
              message.files.map(
                (fl, index) =>
                  fl && (
                    <a
                      target="_blank"
                      href={getPathImage(fl)}
                      download
                      key={index}
                    >
                      {fl.split("/").pop()}
                    </a>
                  )
              )}
          </div>
        </div>
        <span className="msg_time">
          {moment(message.createdAt).locale("fr").calendar()}
        </span>
      </div>
    </div>
  );
}

export function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isIntersecting;
}
