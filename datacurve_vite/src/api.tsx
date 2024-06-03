import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const executeCode = async (code: string) => {
  const response = await API.post("/run", { code });
  return response.data;
};

export const saveCode = async (code: string, output: string) => {
  const response = await API.post("/submit", { code, output });
  return response.data;
};
