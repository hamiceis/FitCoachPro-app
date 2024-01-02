import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
})

//withCredentials, permite que as solicições HTTP recebam headers com os cookies

// api.interceptors.request.use(config => {
//   config.withCredentials = true;
//   return config;
// });
