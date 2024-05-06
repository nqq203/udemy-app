import api from "./api";
import { jwtDecode } from "jwt-decode";

export const callApiCreateAccount = async (userData) => {
  const { data } = await api.post("/users/signup", userData);
  return data;
};

export const callApiLogin = async (userData) => {
  const { data } = await api.post("/users/signin", userData);
  return data;
};

export const callApiGetUserByEmail = async (userEmail) => {
  const { data } = await api.get("/users/email", {
    params: {
      email: userEmail,
    },
  });
  console.log(data);
  return data;
};

export const callApiGetUserById = async (id) => {
  const { data } = await api.get("/users/id", {
    params: {
      id,
    },
  });
  return data;
};

export const callApiUpdateProfile = async (userData) => {
  const { data } = await api.patch("/users/update-profile", userData);
  return data;
};

export const callApiUpdateAvatar = async (imageFile) => {
  const formData = new FormData();

  formData.append("email", localStorage.getItem("email"));

  if (imageFile && imageFile instanceof File) {
    formData.append("image", imageFile);
  }

  const accessToken = localStorage.getItem("accessToken");
  const { data } = await api.put("/users/change-avatar", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const callApiChangePassword = async (newPassword) => {
  const { data } = await api.patch("/users/change-password", newPassword);
  return data;
};

export const callApiLoginWithGoogle = async () => {
  window.location.href = `http://locahost:1000/users/google`;
};

export const callApiLoginWithFacebook = async () => {
  window.location.href = `http://locahost:1000/users/facebook`;
};

export const callApiLogOut = async (userData) => {
  // console.log(userData);
  const accessToken = localStorage.getItem("accessToken");
  let typeLogin = localStorage.getItem("typeLogin");
  if (typeLogin === undefined || typeLogin === null) {
    typeLogin = "normal";
  }
  const decodedToken = jwtDecode(accessToken);
  const request = {
    sessionId: decodedToken.sessionId,
    typeLogin: typeLogin,
  };
  console.log(request);
  console.log(accessToken);
  const { data } = await api.post("users/logout", request, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  localStorage.clear();
  console.log(data);
  return data;
};

export const callApiConfirmAccount = async (token) => {
  const { data } = await api.get(`/users/activate-account/${token}`);
  console.log(data);
  return data;
};

export const callApiForgotPassword = async (email) => {
  const { data } = await api.post("/users/forgot-password", { email });
  return data;
};

export const callApiCheckTokenValidity = async (token) => {
  const { data } = await api.get(`/users/check-token/${token}`);
  return data;
};
export const callApiResetPassword = async (dataInput) => {
  const { data } = await api.put(
    `/users/reset-password/${dataInput.token}`,
    dataInput
  );
  return data;
};

export const callApiAddWishListItem = async (userId, courseId) => {
  console.log('userId:', userId);
  console.log('courseId:', courseId);
  const { data } = await api.post(`/users/${userId}/wishlist`, { courseId });
  return data;
};

export const callApiGetWishlist = async (userId) => {
  const { data } = await api.get(`/users/${userId}/wishlist`);
  return data;
};

export const callApiRemoveWishListItem = async (userId, courseId) => {
  const { data } = await api.put(`/users/${userId}/wishlist`, {
    courseId,
  });
  return data;
};
