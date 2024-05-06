import { Button } from "../../../components/Button/Button";
import { LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { generateUuid } from "../../../utils/Utils";
import Notification from "../../../components/Notification/Notification";
import { useMutation } from "react-query";
import { callApiCreateLecture } from "../../../api/lecture";
import { useDispatch } from "react-redux";
import { setLecturesData } from "../../../redux/lecturesSlice";


function FormTitleAndLink({selectedType, setIsOpenFormTitleAndLink, setIsOpenCreateNewLecture, setLectures, lectures, sectionId, setIsLoading}) {
  const [lectureTitle, setLectureTitle] = useState(null);
  const [lectureURL, setLectureURL] = useState(null);
  const [filename, setFilename] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    bgColor: 'red'
  });

  useEffect(() => {
    console.log(sectionId);
  }, [sectionId]);

  useEffect(() => {
    console.log(file);
  }, [file])
  
  const createSectionMutation = useMutation(
    (sectionData) => callApiCreateLecture(sectionData),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        console.log(data);
        setNotification({
          message: data.message,
          visible: true,
          bgColor: 'green'
        });
        setIsOpenFormTitleAndLink(false);
        setIsOpenCreateNewLecture(false);
        setLectures([
         ...lectures,
          {
            sectionId: data?.metadata?.sectionId,
            _id: data?.metadata?._id,
            title: data?.metadata?.title,
            url: data?.metadata?.url,
            duration: data?.metadata?.duration,
            file: file,
          }
        ]);
        dispatch(setLecturesData([
          ...lectures,
           {
             sectionId: data?.metadata?.sectionId,
             _id: data?.metadata?._id,
             title: data?.metadata?.title,
             url: data?.metadata?.url,
             duration: data?.metadata?.duration,
             file: file,
           }
         ]));
         setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);
      }
    }
  )
  
  function onSubmitLecture() {
    console.log(sectionId);
    if (lectureTitle === '' || !lectureTitle) {
      setNotification({
        message: 'Please enter a title.',
        visible: true,
        bgColor:'red'
      });
      return;
    }
    if (!file) {
      setNotification({
        message: 'Please select a video',
        visible: true,
        bgColor:'red'
      });
      return;
    }
    if (selectedType === 0 && file) {
      createSectionMutation.mutate({
        sectionId: sectionId,
        title: lectureTitle,
        url: lectureURL,
        duration: 0,
        videoFile: file,
      })
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
        <div className="form-title-and-link_title_">Title: </div>
        <input type="text" placeholder="Enter the title" onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle}/>
      </div>
      <div className="form-title-and-link_resource">
        <div className="form-title-and-link_resource_">Resource: </div>
        <div className="inputfile-box">
          <input type="file" id="file" className="inputfile" onChange={(e) => {
             setFile(e.target.files[0]);
             setFilename(e.target.files[0] ? e.target.files[0].name : "");
          }}/>
          <label className="create-lecture-label" htmlFor="file">
            <div id="file-name" className="file-box">
              {filename}
            </div>
            <div className="file-button">Select file</div>
          </label>
        </div>
      </div>
      <div className="form-title-and-link_button">
        <Button 
          style={{ color: "var(--color-gray-500)", fontWeight: "700" }} 
          bgColor="var(--color-white)" 
          hoverBgColor="var(--color-gray-200)"
          onClick={() => {
            setIsOpenFormTitleAndLink(false);
            setIsOpenCreateNewLecture(false);
          }}>Cancel</Button>
        <Button 
          style={{ fontWeight: "700" }}
          onClick={() => onSubmitLecture()}
          hoverBgColor="var(--color-gray-400)">Add Section</Button>
      </div>
    </FormTitleAndLinkWrapper>
  );
}

export default function FormNewLecture({lectures, setLectures, setIsOpenCreateNewLecture, sectionId, setIsLoading}) {
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
      <FormTitleAndLink selectedType={selectedType} setIsOpenFormTitleAndLink={setIsOpenFormTitleAndLink} setIsOpenCreateNewLecture={setIsOpenCreateNewLecture} setLectures={setLectures} lectures={lectures} sectionId={sectionId} setIsLoading={setIsLoading}/>
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
    margin-top: 20px;
  }

  .form-title-and-link_title, .form-title-and-link_resource {
    display: grid;
    grid-template-columns: 80px 1fr;
    margin-bottom: 20px;
    align-items: center;
    padding: 0 30px;
  }

  .form-title-and-link_title_, .form-title-and-link_resource_ {
    font-weight: bold;
    width: 120px;
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

  .create-lecture-label {
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

  .form-title-and-link_button {
    display: grid;
    grid-template-columns: 150px 150px;
    gap: 20px;
    margin-top: 20px;
    margin-left: 30px;
  }
`
