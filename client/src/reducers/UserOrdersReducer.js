import { GET_ORDERS, ORDERS_LOADING } from '../actions/types';

const initialState = {
  orders: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ORDERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
