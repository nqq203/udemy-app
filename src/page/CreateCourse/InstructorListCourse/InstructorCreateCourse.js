import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../../components/Button/Button";
import InstructorCourseLandingPage from "../InstructorCourseCreation/InstructorCourseLandingPage";
import InstructorCurriculum from "../InstructorCourseCreation/InstructorCurriculum";
import InstructorPricing from "../InstructorCourseCreation/IntructorPricing";
import { useSelector, useDispatch } from "react-redux";
// import { callApiCreateCourse, callApiGetInstructorCourseDetail } from "../../../api/course";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { setLecturesData } from "../../../redux/lecturesSlice";
import { setCourseData as setGlobalCourseData, setCoursePrice } from "../../../redux/coursesSlice";
import { setSectionsData, setFilesData, setSectionsIncludeLectures } from "../../../redux/sectionsSlice";

export default function InstructorCreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(2);
  const [files, setFiles] = useState([]);
  const [fullCourse, setFullCourse] = useState(null);
  const course = useSelector(state => state.courses.courseData);
  const sections = useSelector(state => state.sections.fullSection);
  const filesLectures = useSelector(state => state.sections.files);
  const courseType = useSelector(state => state.courseManagement.type);
  
  useEffect(() => {
    if (courseType === 'create') {
      setContentItems([{
        id: 1,
        title: "Curriculum",
        disabled: true,
      }]);
      setPublishItems([{
        id: 2,
        title: "Course landing page",
        disabled: false,
      }, {
        id: 3,
        title: "Pricing",
        disabled: true,
      }]);
    }
    if (courseType === 'update') {
      setContentItems([{
        id: 1,
        title: "Curriculum",
        disabled: false,
      }]);
      setPublishItems([{
        id: 2,
        title: "Course landing page",
        disabled: false,
      }, {
        id: 3,
        title: "Pricing",
        disabled: false,
      }]);
    }
  }, [courseType])

  const [courseData, setCourseData] = useState(
    {
      courseData: {},
      sections: [],
    }
  );
  const [contentItems, setContentItems] = useState([
    {
      id: 1,
      title: "Curriculum",
      disabled: true,
    }
  ]);
  const [publishItems, setPublishItems] = useState([
    {
      id: 2,
      title: "Course landing page",
      disabled: false,
    },
    {
      id: 3,
      title: "Pricing",
      disabled: true,
    }
  ]);

  const getItemClassname = (id) => id === activeItem ? "is-active create-bar-item" : "create-bar-item";

  function onClickItem(id) {
    if (courseType === 'create') {
      const item = contentItems.concat(publishItems).find(it => it.id === id);
      if (item && !item.disabled) {
        setActiveItem(id);
      }
    } else {
      setActiveItem(id);
    }
  }

  function renderActiveComponent() {
    const currentItem = contentItems.concat(publishItems).find(it => it.id === activeItem);
    const isDisabled = currentItem ? currentItem.disabled : false;

    switch (activeItem) {
      case 1:
        return <InstructorCurriculum disabled={isDisabled} />;
      case 2:
        return <InstructorCourseLandingPage disabled={isDisabled} />;
      case 3:
        return <InstructorPricing disabled={isDisabled} />;
      default:
        return <InstructorCourseLandingPage disabled={isDisabled} />;
    }
  }

  // useEffect(() => {
  //   const listFiles = [course?.imageFile, ...filesLectures];
  //   setFiles(listFiles);
  //   setCourseData({
  //     courseData: {
  //       ...course,
  //     },
  //     sections: [
  //       ...sections
  //     ]
  //   })
  // }, [course, sections, filesLectures]);

  async function onClickSubmitCreateCourse() {
    // await callApiCreateCourse({newCourse: courseData, files: files}); 
    // createCourseMutate.mutate({newCourse: courseData, files: files});
  }

  return (
    <InstructorCreateCourseWrapper>
      <CreateCourseOptionBar>
        <CreateContent>
          <h4>Create your content</h4>
          {contentItems.map((item) => {
            const itemClassname = getItemClassname(item.id) + (item.disabled ? ' disabled' : '');
            return (
              <div key={item.id} className={itemClassname} onClick={() => onClickItem(item.id)}>
                <div className="icon"></div>
                <div>{item.title}</div>
              </div>
            );
          })}
        </CreateContent>
        <PublishCourse>
          <h4>Publish your course</h4>
          {publishItems.map((item) => {
            const itemClassname = getItemClassname(item.id) + (item.disabled ? ' disabled' : '');
            return (
              <div key={item.id} className={itemClassname} onClick={() => onClickItem(item.id)}>
                <div className="icon"></div>
                <div>{item.title}</div>
              </div>
            );
          })}
        </PublishCourse>
        <CustomButton width={"100%"} bgColor={"var(--color-purple-300)"} fontWeight={"700"} hoverBgColor={"var(--color-purple-400)"}
        onClick={onClickSubmitCreateCourse}> Submit </CustomButton>

      </CreateCourseOptionBar>
      <CreateCourseMain>
        {renderActiveComponent()}
      </CreateCourseMain>
    </InstructorCreateCourseWrapper>
  );
}

const InstructorCreateCourseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 8vw;
  font-family: var(--font-text-text);

  h4 {
    margin: 0;
    font-family: var(--font-stack-heading);
  }

  .create-bar-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-left: 3px solid transparent; // subtle border for all items
    margin: 8px 0;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;

    &:hover, &.is-active {
      background-color: var(--color-gray-200); // subtle hover background
      border-left-color: var(--color-purple-300); // active or hover state
    }

    .icon {
      margin-right: 10px; // space between icon and text
    }

    &.disabled {
      opacity: 0.6;
      pointer-events: none; // Disable pointer events for disabled items
      cursor: not-allowed;
    }
  }

  h4 {
    font-family: var(--font-stack-heading);
    font-size: 20px;
  }

  margin-bottom: 13%;

  .is-active {
    border-left: 10px solid var(--color-purple-300);
  }
`

const CreateCourseOptionBar = styled.div`
  width: 210px;
  margin-top: 30px;
`

const CreateCourseMain = styled.div`
  width: calc(100% - 210px);
  box-shadow: 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08);
  margin-left: 20px;
`

const CreateContent = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const PublishCourse = styled.div`
  margin-top: 30px;
  cursor: pointer;
`

const CustomButton = styled(Button)`
  margin-top: 10px;
`