import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import { LuPlus } from "react-icons/lu";
import { MdDelete, MdEdit } from "react-icons/md";
import { Fragment, useEffect, useState } from "react";
import FormEditSection from "./FormEditSection";
import FormNewSection from "./FormNewSection";
import FormNewLecture from "./FormNewLecture";
import FormEditLecture from "./FormEditLecture";

export default function InstructorCurriculum() {
  const [lectures, setLectures] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [isOpenCreateNewSection, setIsOpenCreateNewSection] = useState(false);
  const [isOpenCreateNewLecture, setIsOpenCreateNewLecture] = useState(false);
  const [isOpenFormEditSection, setIsOpenFormEditSection] = useState(false);
  const [isOpenFormEditLecture, setIsOpenFormEditLecture] = useState(false);

  // useEffect(() => {
  //   console.log(lectures);
  // }, [lectures]);

  const onDragStart = (event, index) => {
    event.dataTransfer.setData("sectionIndex", index);
    setTimeout(() => {
      event.target.classList.add("dragging");
    }, 0);
  };

  const onDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };
  
  const onDragEnd = (event) => {
    event.target.style.opacity = ""; // Reset opacity
    event.target.classList.remove("dragging"); // Remove dragging class if any
  }

  const onDrop = (event, dropIndex) => {
    const dragIndex = event.dataTransfer.getData("sectionIndex");
    const dragSection = sections[dragIndex];
    const newSections = [...sections];
    // Remove the dragged item
    newSections.splice(dragIndex, 1);
    // Insert it at the drop position
    newSections.splice(dropIndex, 0, dragSection);
    setSections(newSections);

    const updatedLectures = [];
    let globalOrder = 0; // This will be used to assign a new global order to each lecture

    newSections.forEach(section => {
        lectures.filter(lecture => lecture.sectionId === section.sectionId)
                .forEach(lecture => {
                    updatedLectures.push({...lecture, globalOrder: globalOrder++});
                });
    });

    // Update the lectures state to reflect the new global order
    setLectures(updatedLectures.sort((a, b) => a.globalOrder - b.globalOrder));
    
    event.target.classList.remove("dragging");
  };
  

  return (
    <InstructorCurriculumWrap>
      <div className="course-curriculum-header">
        <h3 style={{ fontSize: "25px" }}>Curriculum</h3>
      </div>
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
                    key={sectionItem.sectionId}
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, idx)}
                    onDragEnd={onDragEnd}>
                    {(isOpenFormEditSection && selectedSection === sectionItem.sectionId) ?
                    (<FormEditSection setIsOpenFormEditSection={setIsOpenFormEditSection} sectionTitle={sectionItem.title} setSections={setSections} sections={sections} sectionId={sectionItem.sectionId} idx={idx}/>) :
                    (<div className="section-title" 
                      draggable="true"
                      onDragStart={(e) => onDragStart(e, idx)}
                      >
                        <div>Section {idx + 1}:</div>
                        <div>{sectionItem.title}</div>
                        <div className="curriculum-update-delete">
                          <MdEdit  
                            style={{cursor: "pointer"}} 
                            onClick={() => {
                              setSelectedSection(sectionItem.sectionId);
                              setIsOpenFormEditSection(true);
                            }}/>
                          <MdDelete 
                            style={{cursor: "pointer"}}
                            onClick={() => {
                              let newSections = [...sections];
                              let newLectures = [...lectures];
                              if (lectures.length > 0) {
                                newLectures = newLectures.filter((lecture) => lecture.sectionId !== sectionItem.sectionId);
                              }
                              newSections = newSections.filter((section) => section.sectionId !== sectionItem.sectionId);
                              setSections(newSections);
                              setLectures(newLectures);
                            }}/>
                        </div>
                    </div>)}
                    {lectures?.map((item, lectureIdx) => {
                      return <Fragment>
                        {(item.sectionId === sectionItem.sectionId) && 
                          <>
                          {isOpenFormEditLecture && item.lectureId === selectedLecture? 
                          (<FormEditLecture setIsOpenFormEditLecture={setIsOpenFormEditLecture} lectureTitle={item.title} setLectures={setLectures} lectures={lectures} lectureId={item.lectureId} idx={lectureIdx} imageURL={item.url}/>) :
                          (<LectureItem key={item.lectureId}>
                            <div>Lecture {lectureIdx + 1}: </div>
                            <div>{item.title}</div>
                            <div className="curriculum-update-delete">
                              <MdEdit  
                                style={{cursor: "pointer"}} 
                                onClick={() => {
                                  setSelectedLecture(item.lectureId);
                                  setIsOpenFormEditLecture(true);
                                }}/>
                              <MdDelete 
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                  setSelectedLecture(item.lectureId);
                                  let newLectures = [...lectures];
                                  if (lectures.length > 0) {
                                    newLectures = newLectures.filter((lecture) => lecture.lectureId !== item.lectureId);
                                  }
                                  setLectures(newLectures);
                                }}/>
                            </div>
                          </LectureItem>)}
                          </>}
                      </Fragment>
                    })}
                    {(isOpenCreateNewLecture && sectionItem.sectionId === selectedSection) &&
                      <FormNewLecture lectures={lectures} setLectures={setLectures} setIsOpenCreateNewLecture={setIsOpenCreateNewLecture} sectionId={sections[idx].sectionId}/>
                    }
                    <ButtonCreateLecture
                      onClick={() => {
                        setIsOpenCreateNewLecture(true);
                        setSelectedSection(sectionItem.sectionId);
                      }}>
                      <LuPlus /> <p>Curriculum Item</p>
                    </ButtonCreateLecture>
                  </Section>
                )
              })}
            </SectionWrapper>}
            {isOpenCreateNewSection && <FormNewSection sections={sections} setSections={setSections} setIsOpenCreateNewSection={setIsOpenCreateNewSection} />}
          </MainCreateSection>
          <ButtonCreateSection
            style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}
            onClick={() => setIsOpenCreateNewSection(!isOpenCreateNewSection)}>
            <LuPlus fontWeight={"700"} /> <p>Section</p>
          </ButtonCreateSection>
        </InstructorCreateSection>
      </div>
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
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    font-family: var(--font-stack-heading);
    font-size: 17px;
    position: relative;
  }

  .curriculum-update-delete {
    display: flex;
    flex-direction: row;
    gap: 10px;
    opacity: 0;
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
  color: var(--color-black);
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
  color: var(--color-black);
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
  }

  &:hover {
    background-color: var(--color-gray-200);
  }
`

const LectureItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  font-weight: bold;
  border: 1px solid var(--color-gray-400);
  margin: 0 80px;
  padding: 15px 20px;
  background-color: var(--color-white);
  
  &:hover {
    cursor: all-scroll;
    .curriculum-update-delete {
      opacity: 1;
    }
  }
`