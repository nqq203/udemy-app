import styled from "styled-components";
import 'draft-js/dist/Draft.css';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Notification from "../../../components/Notification/Notification";
import { useSelector, useDispatch } from "react-redux";
import { setCourseData } from "../../../redux/coursesSlice";
import { setCourseType } from "../../../redux/courseManagementSlice";
import { callApiCreateOneCourse, callApiUpdateCourse } from "../../../api/course";
import { useMutation } from "react-query";

export default function InstructorCourseLandingPage() {
  const dispatch = useDispatch();
  const globalCourseData = useSelector(state => state.courses.courseData);
  const courseType = useSelector(state => state.courseManagement.type);
  const [courseTitle, setCourseTitle] = useState(null);
  const [courseDescription, setCourseDescription] = useState(null);
  const [basicInfo, setBasicInfo] = useState({
    category: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    bgColor: 'red'
  });
  const createCourseMutation = useMutation(
    (courseData) => callApiCreateOneCourse(courseData),
    {
      onSuccess: (data) => {
        setNotification({
          message: data.message,
          visible: true,
          bgColor: 'green'
        });
        dispatch(setCourseData(data?.metadata));
      }
    }
  );
  const updateCourseMutation = useMutation(
    (courseData) => callApiUpdateCourse(courseData),
    {
      onSuccess: (data) => {
        setNotification({
          message: data.message,
          visible: true,
          bgColor: 'green'
        });
        dispatch(setCourseData(data?.metadata));
      }
    }
  )

  useEffect(() => {
    if (courseType === 'create') {
      setCourseTitle('');
      setCourseDescription('');
      setBasicInfo(null);
      setImageFile(null);
      setImageURL(null);
    }
    if (globalCourseData) {
      setCourseTitle(globalCourseData.name);
      setCourseDescription(globalCourseData.description);
      setBasicInfo({
        category: globalCourseData.category,
      });
      setImageFile(globalCourseData.imageFile);
      setImageURL(globalCourseData.imageUrl);
    }
  }, [globalCourseData, courseType]);

  function handleFileChange(e) {
    const file = e.target.files[0]; // Get the selected file
    if (file && file.type.startsWith('image/')) {
      // Ensure a file is selected and it's an image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
      // Handle errors or reset state if needed
      setImageURL('/assets/placeholder.jpg');
      setImageFile(null);
      setNotification({
        message: 'Please select an image file.',
        visible: true,
        bgColor:'red'
      });
    }
  };

  async function onSaveCourseLandingPage() {
    if (!courseTitle) {
      setNotification({
        message: 'Please enter a course title.',
        visible: true,
        bgColor:'red'
      });
      return;
    } 
    if (!courseDescription) {
      setNotification({
        message: 'Please enter a course description.',
        visible: true,
        bgColor:'red'
      });
      return;
    }
    if (!basicInfo.category) {
      setNotification({
        message: 'Please select a category.',
        visible: true,
        bgColor:'red'
      });
      return;
    }
    // if (!imageFile || !imageURL) {
    //   setNotification({
    //     message: 'Please select an image file.',
    //     visible: true,
    //     bgColor:'red'
    //   });
    //   return;
    // }

    const course = {
      _id: null || globalCourseData?._id,
      instructorId: localStorage.getItem('_id'),
      name: courseTitle,
      description: courseDescription,
      category: basicInfo.category,
      imageFile: imageFile,
      imageUrl: imageURL,
      publish: false,
    };
   
    dispatch(setCourseType('update'));
    if (courseType === 'create') {
      createCourseMutation.mutate(course);
    }
    else if (courseType === 'update') {
      updateCourseMutation.mutate(course);
    }
  }
  
  return (
    <InstructorCourseLandingPageWrapper>
      <Notification 
        message={notification.message} 
        visible={notification.visible} 
        bgColor={notification.bgColor} 
        onClose={() => setNotification({
          message: '',
          visible: false,
          bgColor: 'green'
        })}/>
      <div className="course-landing-page-header">
        <h3 style={{ fontSize: "25px" }}>Course landing page</h3>
      </div>
      <div className="course-landing-page-content">
        <div>Your course landing page is crucial to your success on Udemy. If it’s done right, it can also help you gain visibility in search engines like Google. As you complete this section, think about creating a compelling Course Landing Page that demonstrates why someone would want to enroll in your course.</div>
        <CourseContent>
          <h3>Course title</h3>
          <input
            type="text"
            placeholder="Insert your course title."
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle} />
          <p>Your title should be a mix of attention-grabbing, informative, and optimized for search.</p>
        </CourseContent>
        <CourseContent>
          <h3>Course description</h3>
          <textarea
            type="text"
            placeholder="Insert your course description."
            onChange={(e) => setCourseDescription(e.target.value)}
            value={courseDescription} />
          <p>Description should have minimum 200 words.</p>
        </CourseContent>
        <CourseContent>
          <h3>Basic info</h3>
          <div className="basic-info">
            <select
              value={basicInfo.category}
              onChange={(e) => setBasicInfo({ ...basicInfo, category: e.target.value })}>
              <option>-- Select Category --</option>
              <option value="DEVELOPMENT">Development</option>
              <option value="BUSINESS">Business</option>
              <option value="DESIGN">Design</option>
            </select>
          </div>
        </CourseContent>
        <CourseContent>
          <h3>Course Image</h3>
          <div className="course-image">
            <div className="course-image-choosing">
              <div >Upload your course image here. It must meet our course image quality standards to be accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.</div>
              <div style={{display: "flex", flexDirection: "row", marginTop: "50px"}}>
                <img src={imageURL || "/assets/placeholder.jpg"} alt="thumbnail"/>
                <CustomButton
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  style={{height: "50px", marginLeft: "50px"}}
                >
                  Upload file
                  <input
                    type="file"
                    style={{display: "none"}}
                    onChange={handleFileChange} // Attach the event handler here
                  />
                </CustomButton>
              </div>
            </div>
          </div>
        </CourseContent>
        <CustomButton 
          style={{fontFamily: "var(--font-stack-text)", color: "var(--color-white)", width: "10%", fontWeight: "600"}}
          onClick={onSaveCourseLandingPage}>
            Save
        </CustomButton>
      </div>
    </InstructorCourseLandingPageWrapper>);
}

const InstructorCourseLandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--font-stack-text);
  
  h3 {
    font-size: 20px;
    padding: 0;
    margin: 10px 0px;
    font-family: var(--font-stack-heading-serif);
  }

  .course-landing-page-header {
    border-bottom: 1px solid var(--color-gray-200);
    padding: 30px 5vw; 
  }

  .course-landing-page-content {
    padding: 15px 5vw; 
  }
`

const CourseContent = styled.div`
  margin-top: 30px;

  p {
    font-size: 12px;
    margin: 5px 0px;
  }

  input[type=text] {
    width: 100%;
    padding: 15px 20px;
    font-size: 15px;
    font-family: Roboto;
    border: 1px solid var(--color-gray-300);
  }

  textarea {
    width: 100%;
    padding: 15px 20px;
    font-size: 15px;
    font-family: Roboto;
    height: 70px;
  }

  textarea:focus, 
  input:focus,
  select:focus {
    outline: none;
  }

  .basic-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 40px;
    
    select {
      width: 30%;
      padding: 15px 20px;
      -webkit-appearance: none;
      -moz-appearance: none; 
      appearance: none; 

      &:hover {
        background-color: var(--color-gray-150);
      }
    }
  }

  .course-image {
    display: flex;
    padding: 10px 0;

    img {
      width: 40%;
      height: auto;
    }

    .course-image-choosing {
      display: flex;
      flex-direction: column;
      padding-left: 20px;
    }
  }

`

const CustomButton = styled(Button)`
  && {
    margin-top: 20px;
    background-color: var(--color-purple-300);
    &:hover {
      background-color: var(--color-purple-400); 
    }
  }

`