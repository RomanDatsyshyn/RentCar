import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { ORDERS_LOADING, GET_ORDERS, GET_ERRORS } from './types';

export const addOrder = (orderData, history) => dispatch => {
  axios
    .post('/api/orders', orderData)
    .then(res => {
      history.push('/profile');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getUserOrders = id => dispatch => {
  dispatch(setUserOrdersLoading());
  let token = localStorage.getItem('jwtToken');
  const decoded = jwt_decode(token);
  axios
    .get(`/users/${decoded.id}`)
    .then(res =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORDERS,
        payload: null
      })
    );
};

export const removeOrder = id => dispatch => {
  axios.delete(`/api/orders/${id}`).then(res => {
    console.log(res);
    console.log(res.data);
  });
};

export const setUserOrdersLoading = () => {
  return {
    type: ORDERS_LOADING
  };
};
