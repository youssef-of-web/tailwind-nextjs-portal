import axios from "axios";

const setAuthToken = (Token) => {
  if (Token) {
    axios.defaults.headers.common["Authorization"] = Token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;