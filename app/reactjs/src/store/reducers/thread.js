import * as actionTypes from "../functions/actionTypes";

const initState = {
  threads: false,
};

const updateObject = (oldObject, newObject) => {
  return {
    ...oldObject,
    ...newObject,
  };
};

const ThreadReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ALL_THREADS:
      return updateObject(state, {
        threads: action.threads,
      });
    case actionTypes.NEW_MESSAGE_IN_THREADS:
      return updateObject(state, {
        threads: state.threads.map((th) =>
          action.thread === th.id
            ? { ...th, messages: [...th.messages, action.message] }
            : th
        ),
      });
    case actionTypes.UPDATE_MESSAGE_IN_THREADS:
      return updateObject(state, {
        threads: state.threads.map((th) =>
          action.thread === th.id
            ? {
                ...th,
                messages: th.messages.map((msg) =>
                  msg.id !== action.message.id ? msg : action.message
                ),
              }
            : th
        ),
      });
    case actionTypes.UPDATE_USER_IN_THREADS:
      return updateObject(state, {
        threads: state.threads.map((th) => ({
          ...th,
          users: th.users.map((us) =>
            us.id === action.user.id ? action.user : us
          ),
        })),
      });
    default:
      return state;
  }
};

export default ThreadReducer;
