import { GET_CAR, CAR_ID_LOADING } from '../actions/types';

const initialState = {
  car: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CAR_ID_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CAR:
      return {
        ...state,
        car: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
