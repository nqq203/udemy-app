import { Button } from "../../../components/Button/Button";
import { LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { generateUuid } from "../../../utils/Utils";
import Notification from "../../../components/Notification/Notification";


function FormTitleAndLink({selectedType, setIsOpenFormTitleAndLink, setIsOpenCreateNewLecture, setLectures, lectures, sectionId}) {
  const [lectureTitle, setLectureTitle] = useState(null);
  const [lectureURL, setLectureURL] = useState(null);
  const [filename, setFilename] = useState(null);
  const [file, setFile] = useState(null);
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    bgColor: 'red'
  });
  
  function onSubmitLecture() {
    if (selectedType === 0 && file) {
      const id = "lecture" + generateUuid();
      if (!file) {
        return;
      }
      setLectures([
      ...lectures,
        {
          sectionId: sectionId,
          _id: id,
          title: lectureTitle,
          url: lectureURL,
          duration: 0,
          file: file,
        }
      ]);
    }
    setLectureTitle('');
    setLectureURL('');
    setFile(null);
    setIsOpenFormTitleAndLink(false);
    setIsOpenCreateNewLecture(false);
  }

  return (
    <FormTitleAndLinkWrapper>
      <Notification message={notification.message} visible={notification.visible} bgColor={notification.bgColor} onClose={() => setNotification({message: '', visible: false, bgColor: 'green'})}/>
      <div className="form-title-and-link_title">
        <div style={{width: "120px"}}>New Lecture: </div>
        <input type="text" placeholder="Enter the title" onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle}/>
      </div>
      <div className="form-title-and-link_resource">
        <div style={{width: "100px"}}>Resource: </div>
        <div class="inputfile-box">
          <input type="file" id="file" className="inputfile" onChange={(e) => {
             setFile(e.target.files[0]);
             setFilename(e.target.files[0] ? e.target.files[0].name : "");
          }}/>
          <label for="file">
            <span id="file-name" className="file-box">{filename}</span>
            <span class="file-button">
              <i class="fa fa-upload" aria-hidden="true"></i>
              Select File
            </span>
          </label>
        </div>
      </div>
      <div className="form-title-and-link_button">
        <Button 
          style={{ color: "var(--color-gray-500)", fontWeight: "700" }} 
          bgColor="var(--color-white)" 
          hoverBgColor="var(--color-white)"
          onClick={() => {
            setIsOpenFormTitleAndLink(false);
            setIsOpenCreateNewLecture(false);
          }}>Cancel</Button>
        <Button 
          style={{ fontWeight: "700" }}
          onClick={() => onSubmitLecture()}>Add Section</Button>
      </div>
    </FormTitleAndLinkWrapper>
  );
}

export default function FormNewLecture({lectures, setLectures, setIsOpenCreateNewLecture, sectionId}) {
  const lectureType = ["Lecture", "Quiz", "Coding Exercise"];
  const [isOpenFormTitleAndLink, setIsOpenFormTitleAndLink] = useState(false);
  const [selectedType, setSelectedType] = useState();

  function onCreateLecture(key) {
    setSelectedType(key);
    setIsOpenFormTitleAndLink(true);
  }

  return (
    <Fragment>
    {!isOpenFormTitleAndLink ? (
      <FormNewLectureWrapper>
      {lectureType.map((item, idx) => {
        return <CurriculumItem key={idx} onClick={() => onCreateLecture(idx)}>
          <LuPlus/> <p>{item}</p>
        </CurriculumItem>
      })}
      <IoMdClose 
        style={{position: "absolute", right: "50px", cursor: "pointer"}}
        onClick={() => {
          setIsOpenCreateNewLecture(false);
        }}/>
    </FormNewLectureWrapper>
    ) : (
      <FormTitleAndLink selectedType={selectedType} setIsOpenFormTitleAndLink={setIsOpenFormTitleAndLink} setIsOpenCreateNewLecture={setIsOpenCreateNewLecture} setLectures={setLectures} lectures={lectures} sectionId={sectionId}/>
    )}
    </Fragment>
  );
}

const FormNewLectureWrapper = styled.div`
  align-items: center;
  justify-content: start;
  border: 1px dotted var(--color-gray-400);
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 5px 20px;
  padding: 0 20px;
  position: relative;
`

const CurriculumItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-family: var(--font-stack-text);
  cursor: pointer;
  font-weight: 700;
  color: var(--color-purple-300);
  
  &:hover {
    color: var(--color-purple-400);
  }
`

const FormTitleAndLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .form-title-and-link_title {
    text-align: center;
    align-items: center;
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: calc(100% - 70px);

    input[type=text] {
      width: calc(100% - 100px);
      padding: 10px 15px;
    }

    input:focus{
      outline: none;
    }
  }

  .form-title-and-link_resource {
    text-align: center;
    align-items: center;
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: calc(100% - 70px);

    .inputfile-box {
      width: 100%;
      margin-left: 25px;
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

  .form-title-and-link_button {
    display: flex;
    justify-content: flex-end;
    margin: 10px 40px;
    padding: 5px 10px;
    gap: 30px;
  }
`
