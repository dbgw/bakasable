import * as actionTypes from "./actionTypes";
import endPoints from "../../config/endPoints";
import connector from "../../connector";

export const getAllUniverses = () => {
  return (dispatch) => {
    connector({
      method: "get",
      url: endPoints.ANONYMOUS_UNIVERSES_CATEGORIES_DETAILS,
      success: (response) => {
        console.log(response.data);
        dispatch({
          type: actionTypes.LOAD_ALL_UNIVERSES,
          universes: response.data["hydra:member"] || []
        });
      },
      catch: (error) => {
        dispatch({
          type: actionTypes.LOAD_ALL_UNIVERSES,
          universes: [],
        });
      },
    });
  };
};
