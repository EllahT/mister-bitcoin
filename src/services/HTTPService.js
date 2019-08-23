const BASE_URL =
  process.env.NODE_ENV === "production" ? "/api/" : "//localhost:3000/api/";

import Axios from "axios";
var axios = Axios.create({
  withCredentials: true
});

async function ajax(endpoint, method = "get", data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data
    });
    return res.data;
  } catch (err) {
    console.log("http service got error:", err);
    if (err.response.status === 401) {
      console.log("http service got 401 error");
    } else {
      return Promise.reject("http service got not-401 error: ", err);
    }
  }
}

export default {
  ajax
};
