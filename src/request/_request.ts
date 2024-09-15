import axios from "axios";

export const getActivities = async () => {
  return await axios.get(`/getactivity`);
};

export const getUserTaskList = async () => {
  return await axios.get(`/gettasks`);
};

export const getbank = async () => {
  return await axios.get("/getbanks");
};
