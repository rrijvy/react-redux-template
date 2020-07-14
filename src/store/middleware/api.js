import * as actions from "./../api";
import axios from "axios";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  try {
    const response = await axios.request({
      url,
      method,
    });

    // dispatch(actions.apiCallSuccess(response.data));

    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // dispatch(actions.apiCallFailed(error));

    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
