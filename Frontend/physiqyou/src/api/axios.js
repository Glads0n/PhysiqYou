// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api/",
//   withCredentials: true, // REQUIRED for session auth
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

// 🔥 THIS IS THE IMPORTANT PART
api.defaults.xsrfCookieName = "csrftoken";
api.defaults.xsrfHeaderName = "X-CSRFToken";

export default api;