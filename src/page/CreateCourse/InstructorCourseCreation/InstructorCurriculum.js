import styled from "styled-components";
import { Button } from "../../../components/Button/Button";
import { Button as ButtonMui } from "@mui/material";
import { LuPlus } from "react-icons/lu";
import { MdDelete, MdEdit } from "react-icons/md";
import { Fragment, useEffect, useState } from "react";
import FormEditSection from "../InstructorForm/FormEditSection";
import FormNewSection from "../InstructorForm/FormNewSection";
import FormNewLecture from "../InstructorForm/FormNewLecture";
import FormEditLecture from "../InstructorForm/FormEditLecture";
import { useDispatch, useSelector } from "react-redux";
import { setSectionsData, setSectionsIncludeLectures, setFilesData } from "../../../redux/sectionsSlice";
import { setLecturesData } from "../../../redux/lecturesSlice";
import { useMutation } from "react-query";
import { callApiDeleteSection } from "../../../api/section";
import Notification from "../../../components/Notification/Notification";
import { callApiDeleteLecture, callApiUpdateLecture } from "../../../api/lecture";
import { ClipLoader } from "react-spinners";

export default function InstructorCurriculum({ isPublished, setIsPublished }) {
  const [lectures, setLectures] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [isOpenCreateNewSection, setIsOpenCreateNewSection] = useState(false);
  const [isOpenCreateNewLecture, setIsOpenCreateNewLecture] = useState(false);
  const [isOpenFormEditSection, setIsOpenFormEditSection] = useState(false);
  const [isOpenFormEditLecture, setIsOpenFormEditLecture] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const globalSections = useSelector(state => state.sections.sections);
  const globalLectures = useSelector(state => state.lectures.lectures);
  const dispatch = useDispatch();
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    bgColor: 'green'
  });

  const deleteSectionMutate = useMutation(
    (sectionId) => callApiDeleteSection(sectionId),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        console.log(data);
        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);
      }
    }
  )

  const deleteLectureMutate = useMutation(
    (lectureId) => callApiDeleteLecture(lectureId),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        console.log(data);
        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);
      }
    }
  )

  useEffect(() => {
    if (isPublished === true) {
      setNotification({
        message: 'Published course successfully',
        visible: true,
        bgColor: 'green'
      });
      setIsPublished(false);
    }
  }, [isPublished]);

  useEffect(() => {
    console.log(globalSections);
    if (globalSections?.length > 0) {
      setSections(globalSections);
    }
  }, [globalSections]);

  useEffect(() => {
    console.log(globalLectures);
    if (globalLectures?.length > 0) {
      setLectures(globalLectures);
    }
  }, [globalLectures]);


  useEffect(() => {
    console.log(sections, lectures);
  }, [sections, lectures]);

  return (
    <InstructorCurriculumWrap>
      <Notification message={notification.message} visible={notification.visible} bgColor={notification.bgColor} onClose={() => setNotification({ message: '', visible: false, bgColor: 'green' })} />
      <div className="course-curriculum-header">
        <h3 style={{ fontSize: "25px" }}>Curriculum</h3>
      </div>
      {isLoading ? <div style={{margin: "30% auto", justifyContent: "center"}}>
        <ClipLoader size={30} color="var(--color-purple-300)"/>
      </div> :
      <div className="course-curriculum-content">
      <div>
        Start putting together your course by creating sections, lectures and practice activities (quizzes, coding exercises and assignments). Use your course outline to structure your content and label your sections and lectures clearly. If you’re intending to offer your course for free, the total length of video content must be less than 2 hours.
      </div>
      <InstructorCreateSection>
        <MainCreateSection>
          {sections && <SectionWrapper>
            {sections?.map((sectionItem, idx) => {
              return (
                <Section
                  key={sectionItem?._id}>
                  {(isOpenFormEditSection && selectedSection === sectionItem?._id) ?
                    (<FormEditSection setIsOpenFormEditSection={setIsOpenFormEditSection} sectionTitle={sectionItem?.name} setSections={setSections} sections={sections} sectionId={sectionItem?._id} idx={idx} setIsLoading={setIsLoading}/>) :
                    (<div className="section-title">
                      <div>Section {idx + 1}:</div>
                      <div>{sectionItem?.name}</div>
                      <div className="curriculum-update-delete">
                        <MdEdit
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedSection(sectionItem._id);
                            setIsOpenFormEditSection(true);
                          }} />
                        <MdDelete
                          style={{ cursor: "pointer" }}
                          onClick={async () => {
                            let newSections = [...sections];
                            let newLectures = [...lectures];
                            if (lectures.length > 0) {
                              newLectures = newLectures.filter((lecture) => lecture.sectionId !== sectionItem?._id);
                            }
                            newSections = newSections.filter((section) => section?._id !== sectionItem?._id);
                            setSections(newSections);
                            setLectures(newLectures);
                            deleteSectionMutate.mutate(sectionItem?._id);
                            dispatch(setSectionsData(newSections));
                            dispatch(setLecturesData(newLectures));
                          }} />
                      </div>
                    </div>)}
                  {lectures?.map((item, lectureIdx) => {
                    return <Fragment>
                      {(item.sectionId === sectionItem?._id) &&
                        <>
                          {isOpenFormEditLecture && item?._id === selectedLecture ?
                            (<FormEditLecture setIsOpenFormEditLecture={setIsOpenFormEditLecture} lectureTitle={item.title} setLectures={setLectures} lectures={lectures} lectureId={item.lectureId} idx={lectureIdx} imageURL={item.url} setIsLoading={setIsLoading}/>) :
                            (<LectureItem key={item.lectureId}>
                              <div>Title: </div>
                              <div>{item.title}</div>
                              <div className="curriculum-update-delete">
                                <MdEdit
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setSelectedLecture(item?._id);
                                    setIsOpenFormEditLecture(true);
                                  }} />
                                <MdDelete
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    let newLectures = [...lectures];
                                    if (lectures.length > 0) {
                                      newLectures = newLectures.filter((lecture) => lecture?._id !== item?._id);
                                    }
                                    setLectures(newLectures);
                                    deleteLectureMutate.mutate(item?._id);
                                    dispatch(setLecturesData(newLectures));
                                  }} />
                              </div>
                            </LectureItem>)}
                        </>}
                    </Fragment>
                  })}
                  {(isOpenCreateNewLecture && sectionItem?._id === selectedSection) &&
                    <FormNewLecture lectures={lectures} setLectures={setLectures} setIsOpenCreateNewLecture={setIsOpenCreateNewLecture} sectionId={sections[idx]?._id} setIsLoading={setIsLoading}/>
                  }
                  <ButtonCreateLecture
                    onClick={() => {
                      setIsOpenCreateNewLecture(true);
                      setSelectedSection(sectionItem?._id);
                    }}>
                    <LuPlus /> <p>Curriculum Item</p>
                  </ButtonCreateLecture>
                </Section>
              )
            })}
          </SectionWrapper>}
          {isOpenCreateNewSection && <FormNewSection sections={sections} setSections={setSections} setIsOpenCreateNewSection={setIsOpenCreateNewSection} setIsLoading={setIsLoading}/>}
        </MainCreateSection>
        <ButtonCreateSection
          style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}
          onClick={() => setIsOpenCreateNewSection(!isOpenCreateNewSection)}>
          <LuPlus fontWeight={"700"} /> <p>Section</p>
        </ButtonCreateSection>
      </InstructorCreateSection>
    </div>}
      {/* <CustomButton 
          style={{fontFamily: "var(--font-stack-text)", color: "var(--color-white)", width: "10%", fontWeight: "600"}}
          onClick={onSaveCurriculum}>
            Save
        </CustomButton> */}
    </InstructorCurriculumWrap>);
}


const InstructorCurriculumWrap = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--font-stack-text);

  h3 {
    font-size: 20px;
    padding: 0;
    margin: 10px 0px;
    font-family: var(--font-stack-heading-serif);
  }

  .course-curriculum-header {
    border-bottom: 1px solid var(--color-gray-200);
    padding: 30px 5vw; 
  }

  .course-curriculum-content {
    padding: 15px 5vw; 
  }
`

const InstructorCreateSection = styled.div`
  margin-top: 30px;
`

const MainCreateSection = styled.div`
  
`

const SectionWrapper = styled.div`
`

const Section = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid var(--color-gray-400);
  background-color: var(--color-gray-100);
  padding: 0 0 10px 0;

  .section-title {
    font-weight: bold;
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
    font-family: var(--font-stack-heading);
    font-size: 17px;
    position: relative;
    align-items: top;

    > div:first-child { 
      width: 80px; 
      overflow: hidden;
      margin-right: 20px;
    }
  }

  .curriculum-update-delete {
    display: flex;
    flex-direction: row;
    gap: 10px;
    opacity: 0;
    margin-left: 10px;
  }

  .section-title:hover {
    .curriculum-update-delete {
      opacity: 1;
    }
  }
`

const ButtonCreateSection = styled(Button)`
  width: 120px;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-500);
  color: var(--color-gray-500);
  font-weight: 700;
  padding: 0 20px;
  font-size: 15px;
  margin-top: 20px;

  &:hover {
    background-color: var(--color-gray-200);
  }
`

const ButtonCreateLecture = styled(Button)`
  margin-left: 20px;
  margin-top: 10px;
  width: 200px;
  height: auto;
  background-color: var(--color-white);
  color: var(--color-gray-500);
  font-weight: 700;
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--color-gray-500);

  p {
    margin: 0;
    padding: 0;
    font-family: var(--font-stack-text);
    color: var(--color-gray-500);
  }

  &:hover {
    background-color: var(--color-gray-200);
  }
`

const LectureItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  font-weight: bold;
  border: 1px solid var(--color-gray-400);
  margin: 0 80px;
  padding: 15px 20px;
  background-color: var(--color-white);

  > div {
    width: auto;
  }

  > div:first-child { // Assuming this is where you render "Lecture {lectureIdx + 1}:"
    width: auto; // Set a fixed width here
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 20px;
  }
  
  &:hover {
    cursor: all-scroll;
    .curriculum-update-delete {
      opacity: 1;
    }
  }
`