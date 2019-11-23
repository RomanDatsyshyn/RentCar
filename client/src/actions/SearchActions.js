import axios from "axios";

import { FIND_CARS, LOADING_SEARCH_RESULT } from "./types";

export const findCars = params => dispatch => {
  console.log(params);
  dispatch(setSearchLoading());
  axios
    .get("/api/cars/search", params)
    .then(res =>
      dispatch({
        type: FIND_CARS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: FIND_CARS,
        payload: null
      })
    );
};

export const setSearchLoading = () => {
  return {
    type: LOADING_SEARCH_RESULT
  };
};
