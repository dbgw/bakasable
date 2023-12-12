import * as actionTypes from "./actionTypes";
import endPoints from "../../config/endPoints";
import connector from "../../connector";

export const getAllThreads = () => {
  return (dispatch) => {
    connector({
      method: "get",
      url: endPoints.THREADS,
      success: (response) => {
        dispatch({
          type: actionTypes.LOAD_ALL_THREADS,
          threads: response.data["hydra:member"] || [],
        });
      },
      catch: (error) => {
        dispatch({
          type: actionTypes.LOAD_ALL_THREADS,
          threads: [],
        });
      },
    });
  };
};
