import api from "./api";

export const callApiCreateLecture = async (sectionData) => {
  const formData = new FormData();
    console.log(sectionData);

    if (sectionData.videoFile && sectionData.videoFile instanceof File) {
      formData.append('videoFile', sectionData.videoFile);
    }

    const { videoFile, ...sectionWithOutFile } = sectionData;
    formData.append("sectionData", JSON.stringify(sectionWithOutFile));

    const accessToken = localStorage.getItem("accessToken");
    const { data } = await api.post("/lectures/create", formData, {
      headers: {
        "authorization": `Bearer ${accessToken}`,
      },
    });
  return data;
}

export const callApiUpdateLecture = async (sectionData) => {
  const formData = new FormData();
  
  const { videoFile, ...sectionWithOutFile } = sectionData;
  formData.append("videoFile", videoFile);
  formData.append("sectionData", sectionWithOutFile);
  const accessToken = localStorage.getItem("accessToken");
  const { data } = await api.put("sections/update-section",  formData, {
    headers: {
      "authorization": `Bearer ${accessToken}`,
    },
  });
  return data;
}

export const callApiDeleteLecture = async (sectionId) => {
  const accessToken = localStorage.getItem("accessToken");
  const { data } = await api.delete("sections/delete-section", {sectionId: sectionId}, {
    headers: {
      "authorization": `Bearer ${accessToken}`,
    },
  });
  return data;
}