import API from "./axios";

export const signupUser = async (userData) => {
  const response = await API.post(
    "/users/signup",
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post(
    "/users/login",
    userData
  );

  return response.data;
};