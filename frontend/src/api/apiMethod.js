import axiosInstance from "./axiosInstance";

export const loginAdmin = async (email, password) => {
  const response = await axiosInstance.post("/admin/adminLogin", {
    email: email,
    password: password,
  });

  return response;
};

export const logoutAdmin = async () => {
  const response = await axiosInstance.post("/admin/logout");
  return response;
};

