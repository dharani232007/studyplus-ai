import API from "./axios";

export const getProfile = async (id) => {
  const res = await API.get(`/profile/${id}`);
  return res.data;
};

export const updateProfile = async (id, data) => {
  const res = await API.put(`/profile/${id}`, data);
  return res.data;
};

export const updateEducation = async (id, data) => {
  const res = await API.put(
    `/profile/education/${id}`,
    data
  );

  return res.data;
};

export const updatePreferences = async (
  id,
  data
) => {
  const res = await API.put(
    `/profile/preferences/${id}`,
    data
  );

  return res.data;
};

export const uploadProfileImage = async (
  id,
  file
) => {

  const formData = new FormData();

  formData.append("image", file);

  const res = await API.put(
    `/profile/image/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data"
      }
    }
  );

  return res.data;
};