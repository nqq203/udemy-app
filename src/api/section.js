import api from "./api";

export const callApiCreateSection = async (sectionData) => {
  console.log(sectionData);
  const accessToken = localStorage.getItem("accessToken");
  const { data } = await api.post("/sections/create", sectionData, {
    headers: {
      "authorization": `Bearer ${accessToken}`,
    },
  });
  return data;
}

export const callApiUpdateSection = async (sectionData) => {
  console.log(sectionData);
  const accessToken = localStorage.getItem("accessToken");
  const { data } = await api.put("/sections/update-section", sectionData, {
    headers: {
      "authorization": `Bearer ${accessToken}`,
    },
  });
  return data;
}

export const callApiDeleteSection = async (sectionId) => {
  const accessToken = localStorage.getItem("accessToken");
  const { data } = await api.delete(`/sections/delete-section/${sectionId}`, {
    headers: {
      "authorization": `Bearer ${accessToken}`,
    },
  });
  return data;
}