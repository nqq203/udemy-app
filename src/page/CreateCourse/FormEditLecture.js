import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import { useState } from "react";

export default function FormEditLecture({setIsOpenFormEditLecture, lectureTitle, setLectures, lectures, lectureId, idx, imageURL}) {
  const [newLectureTitle, setNewLectureTitle] = useState(lectureTitle);
  const [newLectureURL, setNewLectureURL] = useState(imageURL);

  const onSaveLecture = () => {
    if (newLectureTitle === "" || newLectureTitle === null) {
      return;
    }
    if (lectures !== null) {
      const lectureIdx = lectures.findIndex(s => s.lectureId === lectureId);
      const newLectures = [...lectures];
      newLectures[lectureIdx].title = newLectureTitle;
      newLectures[lectureIdx].url = newLectureTitle;
      setLectures(newLectures);
    }
    setNewLectureTitle(null);
    setNewLectureURL(null);
    setIsOpenFormEditLecture(false);
  }

  return (
    <FormEditLectureWrapper>
      <div className="edit-lecture-title">
        <div className="edit-lecture-title_"> Lecture {idx + 1}: </div>
        <input type="text" value={newLectureTitle} onChange={(e) => setNewLectureTitle(e.target.value)}/>
      </div>
      <div className="edit-lecture-resource">
        <div className="edit-lecture-resource_"> Resource </div>
        <div class="inputfile-box">
          <input type="file" id="file" className="inputfile" onChange={(e) => {
             setNewLectureURL(e.target.files[0]);
             setNewLectureTitle(e.target.files[0] ? e.target.files[0].name : "");
          }}/>
          <label for="file">
            <span id="file-name" className="file-box">{newLectureURL}</span>
            <span class="file-button">
              <i class="fa fa-upload" aria-hidden="true"></i>
              Select File
            </span>
          </label>
        </div>
      </div>
      <div className="edit-lecture_button">
        <Button 
            style={{ color: "var(--color-gray-500)", fontWeight: "700"}} 
            bgColor="var(--color-white)" 
            hoverBgColor="var(--color-white)"
            padding="5px"
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
  padding: 10px 20px 0 20px;
  background-color: var(--color-white);
  

  .edit-lecture-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    .edit-lecture-title_ {
      font-weight: bold;
      width: 120px;
    }
    input[type=text] {
      padding: 10px 15px;
      font-size: 15px;
      width: 100%;
    }
  
    input:focus {
      outline: none;
    }
  }

  .edit-lecture_button {
    display: flex;
    justify-content: flex-end;
    margin: 10px 10px;
    gap: 30px;
  }

  .edit-lecture-resource {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 10px 0;

    .edit-lecture-resource_ {
      font-weight: bold;
      width: 125px;
    }

    .inputfile-box {
      width: 100%;
    }
    
    label {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
    
    .inputfile {
      display: none;
    }
    
    .file-box {
      display: inline-block;
      width: 100%;
      border: 1px solid;
      padding: 5px 0px 5px 5px;
      box-sizing: border-box;
      height: calc(2rem - 2px);
    }
    
    .file-button {
      background: var(--color-gray-200);
      padding: 5px;
      border: 1px solid;
      width: 100px;
    }
  }
`