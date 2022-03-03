import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";
const initialState = {};
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;