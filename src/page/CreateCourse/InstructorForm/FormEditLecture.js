import styled from "styled-components";
import { Button } from "../../../components/Button/Button";
import { useEffect, useState } from "react";
import Notification from "../../../components/Notification/Notification";
import { useMutation } from "react-query";
import { callApiUpdateLecture } from "../../../api/lecture";
import { useDispatch } from "react-redux";
import { setLecturesData } from "../../../redux/lecturesSlice";
import { setSectionsData } from "../../../redux/sectionsSlice";

export default function FormEditLecture({ setIsOpenFormEditLecture, lectureTitle, setLectures, lectures, lectureId, idx, imageURL, setIsLoading }) {
  const dispatch = useDispatch();
  const [newLectureTitle, setNewLectureTitle] = useState(lectureTitle);
  const [newLectureFile, setNewLectureFile] = useState(null); // Chứa file mới nếu có
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    bgColor: 'green'
  });

  const updateLectureMutate = useMutation(
    (lectureData) => callApiUpdateLecture(lectureData),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        console.log(data);
        if (data?.success) {
          setNotification({
            message: data?.message,
            visible: true,
            bgColor: 'green'
          });
          const newLectures = [...lectures];
          newLectures[idx] = data?.metadata;
          setLectures(newLectures);
          dispatch(setLecturesData(newLectures));
        }
        else {
          setNotification({
            message: data?.message,
            visible: true,
            bgColor:'red'
          });
        }
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      }
    }
  )

  const onSaveLecture = () => {
    if (newLectureTitle === "" || newLectureTitle === null) {
      setNotification({
        message: 'Please enter a title',
        visible: true,
        bgColor: 'red'
      });
      return;
    }
    if (lectures !== null) {
      let newLectures = [...lectures];
      let updatedLecture = { ...newLectures[idx] };
      updatedLecture.title = newLectureTitle;
      updateLectureMutate.mutate({
        ...updatedLecture, 
        file: newLectureFile
      });
    }
    setNewLectureTitle(lectureTitle); // Reset lại tiêu đề cũ
    setNewLectureFile(null); // Clear file đã chọn
    setIsOpenFormEditLecture(false); // Đóng form
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewLectureFile(file);
    }
  }

  return (
    <FormEditLectureWrapper>
      <Notification message={notification.message} visible={notification.visible} bgColor={notification.bgColor} onClose={() => setNotification({ message: '', visible: false, bgColor: 'green' })} />
      <div className="edit-lecture-title">
        <div className="edit-lecture-title_"> Title: </div>
        <input type="text" value={newLectureTitle} onChange={(e) => setNewLectureTitle(e.target.value)} />
      </div>
      <div className="edit-lecture-resource">
        <div className="edit-lecture-resource_"> Resource: </div>
        <div className="inputfile-box">
          <input type="file" id="file" className="inputfile" onChange={handleFileChange} />
          <label className="edit-lecture-label" htmlFor="file">
            <div id="file-name" className="file-box">
              {newLectureFile ? newLectureFile.name : imageURL}
            </div>
            <div className="file-button">Select file</div>
          </label>
        </div>
      </div>
      <div className="edit-lecture_button">
        <Button
          style={{ color: "var(--color-gray-500)", fontWeight: "700" }}
          bgColor="var(--color-gray-100)"
          hoverBgColor="var(--color-gray-200)"
          margin="10px"
          onClick={() => setIsOpenFormEditLecture(false)}>Cancel</Button>
        <Button
          style={{ fontWeight: "700" }}
          onClick={onSaveLecture}>Save Lecture</Button>
      </div>
    </FormEditLectureWrapper>
  );
}

const FormEditLectureWrapper = styled.div`
  margin: 10px;
  border: 1px solid var(--color-gray-400);
  padding: 10px 10px 0 10px;
  background-color: var(--color-white);
  
  .edit-lecture-title, .edit-lecture-resource {
    display: grid;
    grid-template-columns: 80px 1fr;
    margin-bottom: 20px;
    align-items: center;
  }

  .edit-lecture-title_, .edit-lecture-resource_ {
    font-weight: bold;
  }

  input[type=text] {
    padding: 10px;
    font-size: 15px;
  }

  input:focus {
    outline: none;
  }

  input[type=file] {
    display: none;
  }

  .edit-lecture_button {
    margin: 10px;
  }

  .edit-lecture-label {
    display: grid;
    grid-template-columns: 9fr 1fr;
  }

  .file-box {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: 1px solid var(--color-gray-400);
    padding: 10px;
    cursor: pointer;
  }

  .file-button {
    border: 1px solid var(--color-gray-400);
    background-color: var(--color-gray-200);
    padding: 10px;
    width: 70px;
    justify-content: center;
  }
`