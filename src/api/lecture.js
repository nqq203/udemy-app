import api from "./api";

export const callApiCreateLecture = async (lectureData) => {
  const formData = new FormData();
  console.log(lectureData);

  if (lectureData.videoFile && lectureData.videoFile instanceof File) {
    formData.append('videoFile', lectureData.videoFile);
  }

  const { videoFile, ...lecturesWithOutFile } = lectureData;
  formData.append("lectureData", JSON.stringify(lecturesWithOutFile));

  const accessToken = localStorage.getItem("accessToken");
  const { data } = await api.post("/lectures/create", formData, {
    headers: {
      "authorization": `Bearer ${accessToken}`,
    },
  });
  return data;
}

export const callApiUpdateLecture = async (lectureData) => {
  const formData = new FormData();
  console.log(lectureData);

  formData.append('videoFile', lectureData.file);
  const { file, ...lecturesWithOutFile } = lectureData;
  formData.append("lectureData", JSON.stringify(lecturesWithOutFile));

  const accessToken = localStorage.getItem("accessToken");
  const { data } = await api.put("/lectures/update-lecture", formData, {
    headers: {
      "authorization": `Bearer ${accessToken}`,
    },
  });
  return data;
}

export const callApiDeleteLecture = async (lectureId) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log(lectureId);
  const { data } = await api.delete(`lectures/delete-lecture/${lectureId}`, {
    headers: {
      "authorization": `Bearer ${accessToken}`,
    },
  });
  return data;
}