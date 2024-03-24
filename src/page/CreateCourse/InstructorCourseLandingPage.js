import styled from "styled-components";
import 'draft-js/dist/Draft.css';
import { useState } from "react";
import { FaBold, FaItalic, FaListOl, FaListUl } from "react-icons/fa";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Notification from "../../components/Notification/Notification";
import ReactCrop from "react-image-crop";
import { useDropzone } from 'react-dropzone';


export default function InstructorCourseLandingPage() {
  const [courseTitle, setCourseTitle] = useState(null);
  const [courseSubtitle, setCourseSubtitle] = useState(null);
  const [courseDescription, setCourseDescription] = useState(null);
  const [basicInfo, setBasicInfo] = useState({
    language: 'en',
    level: null,
    category: null,
  });
  const [imageURL, setImageURL] = useState('/assets/placeholder.jpg');
  const [crop, setCrop] = useState({ aspect: 750 / 422 });
  const [croppedImage, setCroppedImage] = useState(null);
  const [fileNotification, setFileNotification] = useState({
    content: '',
    valid: null,
  });

  const onDrop = (files) => {
    const file = files[0];
    if (file && /^image\/(jpeg|png|jpg)$/.test(file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => setImageURL(e.target.result);
      reader.readAsDataURL(file);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/jpeg, image/png' });

  const getCroppedImg = async (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        const croppedUrl = URL.createObjectURL(blob);
        setCroppedImage(croppedUrl);
      }, 'image/jpeg');
    });
  };

  return (
    <InstructorCourseLandingPageWrapper>
      {fileNotification?.valid ?
        <Notification
          message={fileNotification?.content}
          visible={fileNotification?.valid}
          onClose={() => setFileNotification({ content: '', valid: null })} /> :
        <Notification
          message={fileNotification?.content}
          visible={fileNotification?.valid}
          onClose={() => setFileNotification({ content: '', valid: null })}
          bgColor={"var(--color-red-300)"} />}
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
          <h3>Course subtitle</h3>
          <input
            type="text"
            placeholder="Insert your course subtitle."
            onChange={(e) => setCourseSubtitle(e.target.value)}
            value={courseSubtitle} />
          <p>Use 1 or 2 related keywords, and mention 3-4 of the most important areas that you've covered during your course.</p>
        </CourseContent>
        <CourseContent>
          <h3>Course description</h3>
          <textarea
            type="text"
            placeholder="Insert your course subtitle."
            onChange={(e) => setCourseDescription(e.target.value)}
            value={courseDescription} />
          <p>Description should have minimum 200 words.</p>
        </CourseContent>
        <CourseContent>
          <h3>Basic info</h3>
          <div className="basic-info">
            <select
              value={basicInfo.language}
              setBasicInfo={(e) => setBasicInfo({ ...basicInfo, language: e.target.value })}>
              <option value="english">English</option>
              <option value="vietnamese">Tiếng Việt</option>
            </select>
            <select
              value={basicInfo.level}
              setBasicInfo={(e) => setBasicInfo({ ...basicInfo, level: e.target.value })}>
              <option>-- Select Level --</option>
              <option value="beginner-level">Beginner Level</option>
              <option value="intermediate-level">Intermediate Level</option>
              <option value="expert-level">Expert Level</option>
              <option value="all-levels">All Levels</option>
            </select>
            <select
              value={basicInfo.category}
              setBasicInfo={(e) => setBasicInfo({ ...basicInfo, category: e.target.value })}>
              <option>-- Select Category --</option>
              <option value="Development">Development</option>
              <option value="Bussiness">Bussiness</option>
              <option value="Design">Design</option>
            </select>
          </div>
        </CourseContent>
        <CourseContent>
          <h3>Course Image</h3>
          <div className="course-image">
            {croppedImage && (<ReactCrop
              src={croppedImage}
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(crop, pixelCrop) => getCroppedImg(document.querySelector('.ReactCrop__image'), crop)}
            />)}
            {imageURL && <img src={imageURL} alt="Cropped" />}
            <div className="course-image-choosing">
              <div >Upload your course image here. It must meet our course image quality standards to be accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.</div>
              <CustomButton
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <div {...getRootProps}>
                  <input
                    {...getInputProps()}
                    hidden
                  />
                </div>
              </CustomButton>
            </div>
          </div>
        </CourseContent>
        <CustomButton style={{fontFamily: "var(--font-stack-text)", color: "var(--color-white)", width: "10%", fontWeight: "600"}}>Save</CustomButton>
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
    justify-content: space-between;
    align-items: center;
    
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

const StyleBtn = styled.button`
  background-color: var(--color-gray-100);
  border: none;
  padding: 10px;
`

const EditorWrapper = styled.div`
  width: 100%;
  min-height: 100px; // Set a minimum height
  height: auto;
  padding: 15px 20px;
  font-size: 15px;
  border: 1px solid black; // Add border to visualize the Editor's boundaries
  cursor: text;

  &:focus-within {
    outline: 0;
  }

  .EditorWrapper .DraftEditor-root {
    font-size: 15px; /* Ensure font size is applied to the editor content */
  }

  .public-DraftEditorPlaceholder-root {
    border-color: var(--color-gray-400);
    color: #888; /* Customize this color to your liking */
  }

  .public-DraftEditorPlaceholder-root {
    color: #888; 
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