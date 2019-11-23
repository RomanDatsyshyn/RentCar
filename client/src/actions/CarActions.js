import axios from 'axios';
// import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";

import {
  GET_CARS,
  GET_CAR,
  CAR_ID_LOADING,
  CAR_LOADING,
  GET_ERRORS
} from './types';

export const getCars = () => dispatch => {
  dispatch(setCarLoading());
  axios
    .get('/api/cars')
    .then(res =>
      dispatch({
        type: GET_CARS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CARS,
        payload: null
      })
    );
};

export const getCar = id => dispatch => {
  dispatch(setCarIDLoading());
  axios
    .get(`/api/${id}`)
    .then(res =>
      dispatch({
        type: GET_CAR,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CAR,
        payload: null
      })
    );
};

export const setCarLoading = () => {
  return {
    type: CAR_LOADING
  };
};

export const setCarIDLoading = () => {
  return {
    type: CAR_ID_LOADING
  };
};

export const add = (carData, history) => dispatch => {
  axios({
    method: 'post',
    url: '/api/cars',
    data: carData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  })
    .then(res => history.push('/'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
