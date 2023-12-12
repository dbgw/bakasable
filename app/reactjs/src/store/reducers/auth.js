import jwtDecode from "jwt-decode";

import * as actionTypes from "../functions/actionTypes";

const initState = {
  token: null,
  roles: [],
  user: false,
};

const updateObject = (oldObject, newObject) => {
  return {
    ...oldObject,
    ...newObject,
  };
};

const AuthReducer = (state = initState, action) => {
  let decodeToken = null;

  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REFRESH_TOKEN:
      if (action.token) {
        localStorage.setItem("token", action.token);
      }
      if (action.refresh_token) {
        localStorage.setItem("refresh_token", action.refresh_token);
      }

      decodeToken = jwtDecode(action.token);

      return updateObject(state, {
        token: action.token,
        roles: [...decodeToken.roles],
        user: {
          id: decodeToken.id,
          email: decodeToken.username,
          firstName: decodeToken.firstName,
          lastName: decodeToken.lastName,
          isCompleted: decodeToken.isCompleted,
        },
      });

    case actionTypes.SET_USER:
      return updateObject(state, {
        user:
          action.user !== undefined
            ? action.user
            : action.isCompleted !== undefined
            ? { ...state.user, isCompleted: action.isCompleted }
            : state.user,
      });

    case actionTypes.SET_TOKEN:
      localStorage.setItem("refresh_token", action.refresh_token);
      localStorage.setItem("token", action.token);
      return updateObject(state, {
        token: action.token,
      });

    case actionTypes.REFRESH_TOKEN_FAIL:
    case actionTypes.LOGOUT:
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token");
      return updateObject(state, initState);
    default:
      return state;
  }
};

export default AuthReducer;
