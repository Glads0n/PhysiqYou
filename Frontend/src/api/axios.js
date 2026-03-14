// // import axios from "axios";

// // const api = axios.create({
// //   baseURL: "http://localhost:8000/api/",
// //   withCredentials: true, // REQUIRED for session auth
// // });

// // export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api/",
//   withCredentials: true,
// });

// // 🔥 THIS IS THE IMPORTANT PART
// api.defaults.xsrfCookieName = "csrftoken";
// api.defaults.xsrfHeaderName = "X-CSRFToken";

// export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api/",
//   withCredentials: true,
//   xsrfCookieName: "csrftoken",
//   xsrfHeaderName: "X-CSRFToken",
// });

// export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api/",
//   withCredentials: true,
//   xsrfCookieName: "csrftoken",
//   xsrfHeaderName: "X-CSRFToken",
// });

// export default api;

// import axios from "axios";


// function getCSRFToken() {
//   const name = "csrftoken=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const cookies = decodedCookie.split(";");

//   for (let cookie of cookies) {
//     cookie = cookie.trim();
//     if (cookie.startsWith(name)) {
//       return cookie.substring(name.length);
//     }
//   }
//   return null;
// }

// const api = axios.create({
//   baseURL: "https://physiqyou.onrender.com/api/",
//   // baseURL: "http://127.0.0.1:8000/api/",
//   withCredentials: true,
// });


// api.interceptors.request.use((config) => {
//   const csrfToken = getCSRFToken();
//   if (csrfToken) {
//     config.headers["X-CSRFToken"] = csrfToken;
//   }
//   return config;
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://physiqyou.onrender.com",

  withCredentials: true,

  // Let axios automatically handle Django CSRF
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

export default api;