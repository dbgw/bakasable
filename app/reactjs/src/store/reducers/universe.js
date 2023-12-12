import * as actionTypes from "../functions/actionTypes";


const initState = {
  universes: false,
  universesLength: 0,
  universesPageIndex: 0,
  allUniverses: false,
};

const updateObject = (oldObject, newObject) => {
  return {
    ...oldObject,
    ...newObject,
  };
};

const UniverseReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ALL_UNIVERSES:
      return updateObject(state, {
        allUniverses: action.universes,
      });
    default:
      return state;
  }
};

export default UniverseReducer;
