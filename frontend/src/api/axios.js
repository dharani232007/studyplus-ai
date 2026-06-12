// import axios from "axios";

// const API = axios.create({

//   baseURL:
//     import.meta.env.VITE_API_URL,

// });

// API.interceptors.request.use(

//   (config) => {

//     const user =
//       JSON.parse(
//         localStorage.getItem("user")
//       );

//     if (user?.token) {

//       config.headers.Authorization =
//         `Bearer ${user.token}`;

//     }

//     return config;
//   }

// );

// export default API;


import axios from "axios";

console.log("API URL:", import.meta.env.VITE_API_URL);

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default API;