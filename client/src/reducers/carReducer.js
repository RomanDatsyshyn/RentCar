import { GET_CARS, CAR_LOADING } from "../actions/types";

const initialState = {
  cars: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CAR_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CARS:
      return {
        ...state,
        cars: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
