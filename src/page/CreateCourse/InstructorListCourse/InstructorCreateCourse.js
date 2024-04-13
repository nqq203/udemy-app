import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../../components/Button/Button";
import InstructorCourseLandingPage from "../InstructorCourseCreation/InstructorCourseLandingPage";
import InstructorCurriculum from "../InstructorCourseCreation/InstructorCurriculum";
import InstructorPricing from "../InstructorCourseCreation/IntructorPricing";
import { useSelector, useDispatch } from "react-redux";
import { callApiCreateCourse, callApiGetInstructorCourseDetail } from "../../../api/course";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { setLecturesData } from "../../../redux/lecturesSlice";
import { setCourseData as setGlobalCourseData, setCoursePrice } from "../../../redux/coursesSlice";
import { setSectionsData, setFilesData, setSectionsIncludeLectures } from "../../../redux/sectionsSlice";

export default function InstructorCreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(1);
  const [files, setFiles] = useState([]);
  const [fullCourse, setFullCourse] = useState(null);
  const course = useSelector(state => state.courses.courseData);
  const sections = useSelector(state => state.sections.fullSection);
  const filesLectures = useSelector(state => state.sections.files);
  
  // const { data: fetchedCourse } = useQuery(
  //   ['instructorCourseDetail', courseId],
  //   () => callApiGetInstructorCourseDetail(courseId),
  //   {
  //     onSuccess: (data) => {
  //       console.log(data);
  //     },
  //     onError: (error) => {
  //       console.error("Error fetching data:", error);
  //     },
  //     staleTime: Infinity, // adjust depending on how frequently your data updates
  //     enabled: !!courseId, // only run query if courseId is available
  //     refetchOnWindowFocus: false, // set to true if you want fresh data when window is refocused
  //   }
  // );
  
  async function getCourseData(courseId) {
    console.log(courseId);
    const data = await callApiGetInstructorCourseDetail(courseId);
    setFullCourse(data);
  }

  // useEffect(() => {
  //   getCourseData(courseId);
  // }, [courseId]);

  useEffect(() => {
    console.log(fullCourse);
  }, [fullCourse]);

  const createCourseMutate = useMutation(
    (course) => callApiCreateCourse(course), 
    {
      onSuccess: (data) => {
        dispatch(setGlobalCourseData({
          instructorId: null,
          name:null,
          description:null,
          price:0
        }));
        dispatch(setCoursePrice(0));
        dispatch(setLecturesData([]));
        dispatch(setSectionsData([]));
        dispatch(setFilesData([]));
        dispatch(setSectionsIncludeLectures([]));
        navigate("/instructor/courses")
      }
    }
  );
  const [courseData, setCourseData] = useState(
    {
      courseData: {},
      sections: [],
    }
  );
  const contentItems = [
    {
      id: 1,
      title: "Curriculum",

    }
  ];
  const publishItems = [
    {
      id: 2,
      title: "Course landing page",
    },
    {
      id: 3,
      title: "Pricing",
    }
  ];

  const getItemClassname = (id) => id === activeItem ? "is-active create-bar-item" : "create-bar-item";

  function onClickItem(id) {
    setActiveItem(id);
  }

  function renderActiveComponent() {
    switch (activeItem) {
      case 1:
        return <InstructorCurriculum />;
      case 2:
        return <InstructorCourseLandingPage />;
      // case 3:
      //   return <InstructorLevel />;
      case 3:
        return <InstructorPricing />;
      default:
        return <InstructorCourseLandingPage />;
    }
  }

  useEffect(() => {
    const listFiles = [course?.imageFile, ...filesLectures];
    setFiles(listFiles);
    setCourseData({
      courseData: {
        ...course,
      },
      sections: [
        ...sections
      ]
    })
  }, [course, sections, filesLectures]);

  async function onClickSubmitCreateCourse() {
    // await callApiCreateCourse({newCourse: courseData, files: files}); 
    createCourseMutate.mutate({newCourse: courseData, files: files});
  }

  return (
    <InstructorCreateCourseWrapper>
      <CreateCourseOptionBar>
        <CreateContent>
          <h4>Create your content</h4>
          {contentItems.map((item) => {
            return <div key={item.id} className={getItemClassname(item.id)} onClick={() => onClickItem(item.id)}>
              <div className="icon"></div>
              <div>{item.title}</div>
            </div>
          })}
        </CreateContent>
        <PublishCourse>
          <h4>Publish your course</h4>
          {publishItems.map((item) => {
            return <div key={item.id} className={getItemClassname(item.id)} onClick={() => onClickItem(item.id)}>
              <div className="icon"></div>
              <div>{item.title}</div>
            </div>
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
    flex-direction: row;
    padding: 10px 20px;
    border-left: 10px solid var(--color-white);
    margin: 10px 0;
    cursor: pointer;
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
`

const PublishCourse = styled.div`
  margin-top: 30px;
`

const CustomButton = styled(Button)`
  margin-top: 10px;
`