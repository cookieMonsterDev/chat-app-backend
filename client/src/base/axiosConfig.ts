import axios from "axios";

const chatApi = axios.create({
  baseURL: "http://localhost:3000/",
});

export default chatApi;
