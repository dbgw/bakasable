import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ItemMessage,
  ListeMessagesItems,
} from "../assets/styles/adminStyle/adminGlobalStyle";
import { ChatIconOrange } from "../assets/styles/icons";
import { getPathImage, getUniqueItemsByProperties } from "../helper/functions";
import MercureSubscriber from "@cerati/react-mercure";
import { NEW_MESSAGE_IN_THREADS } from "../store/functions/actionTypes";
import { ROLES } from "../vars";

export default function ListMessagerie({
  state,
  setState,
  data = [],
  now,
  getNameUser = () => {},
  ...props
}) {
  const auth = useSelector((state) => state.auth);
  const dipatch = useDispatch();

  const newMessageInThread = (thread, payload) => {
    if (payload.type === "new_message")
      dipatch({
        type: NEW_MESSAGE_IN_THREADS,
        thread: thread,
        message: payload.message,
      });
  };
  const scrollChat = () => {
    const container = document.getElementById("messages-container");
    if (container) container.scrollTop = container.scrollHeight;
  };
  useEffect(() => {
    scrollChat();
  }, [state.activeItem]);

  const isActif = (date) => {
    const diff = moment(date).diff(now, "second") * -1;
    return diff <= 30 ? true : false;
  };

  const showData = () => {
    if (data === false) {
      return (
        <p className="loading-table" style={{ textAlign: "center" }}>
          Chargement...
        </p>
      );
    }
    if (data.length === 0) {
      return (
        <div className="no-content-loading" style={{ textAlign: "center" }}>
          Aucune donnée
        </div>
      );
    }
    return data.map(($val, $index) => {
      const lastMessage = $val.messages.at(-1);
      const otherUser = $val.users.find((us) => us.id !== auth.user.id);
      const nonSeenMessages = getUniqueItemsByProperties($val.messages, [
        "id",
      ]).filter((msg) => msg.user.id !== auth.user.id && !msg.seen);

      return (
        <div key={$index}>
          <MercureSubscriber
            hub={`${process.env.REACT_APP_MERCURE_URL}/.well-known/mercure`}
            topics={[`${process.env.REACT_APP_API_URI}/${$val.id}`]}
            update={(payload) => newMessageInThread($val.id, payload)}
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
                  otherUser.lastSeen = payload.user.lastSeen;
                }
              }}
              json
            />
          )}
          {lastMessage && (
            <ItemMessage
              className={
                state.activeItem && state.activeItem.id === $val.id
                  ? "active"
                  : ""
              }
              onClick={() => {
                setState({ ...state, activeItem: $val });
              }}
            >
              <div className="bloc-info-message">
                <div
                  className={`img-profil ${
                    isActif(otherUser.lastSeen) ? "en-ligne" : ""
                  }`}
                >
                  {otherUser.picture ? (<img
                    src={getPathImage(otherUser.picture)}
                    alt={getNameUser(otherUser)}
                  />) : getNameUser(otherUser, true)}
                </div>
                <p className="name-profil">
                  {getNameUser(otherUser)}
                </p>
                <span className="date-profil-message">
                  {moment(lastMessage.createdAt).locale("fr").calendar()}
                </span>
              </div>
              {lastMessage && (
                <div
                  className="last-profil-message"
                  style={
                    nonSeenMessages.length > 0 ? { fontWeight: "bold" } : {}
                  }
                >
                  {lastMessage.text}
                </div>
              )}

              {nonSeenMessages.length > 0 ? (
                <div className="cout-no-read-message">
                  <span>
                    <ChatIconOrange /> {nonSeenMessages.length}
                  </span>
                </div>
              ) : null}
            </ItemMessage>
          )}
        </div>
      );
    });
  };
  return <ListeMessagesItems>{showData()}</ListeMessagesItems>;
}
