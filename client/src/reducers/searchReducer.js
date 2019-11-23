import { FIND_CARS, LOADING_SEARCH_RESULT } from "../actions/types";

const initialState = {
  findedCars: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_SEARCH_RESULT:
      return {
        ...state,
        loading: true
      };
    case FIND_CARS:
      return {
        ...state,
        findedCars: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
