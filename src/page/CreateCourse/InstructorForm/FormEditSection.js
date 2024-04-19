import styled from "styled-components";
import { Button } from "../../../components/Button/Button";
import { useState } from "react";
import { useMutation } from "react-query";
import { callApiUpdateSection } from "../../../api/section";
import { useDispatch, useSelector } from "react-redux";
import { setSectionsData } from "../../../redux/sectionsSlice";
import Notification from "../../../components/Notification/Notification";

export default function FormEditSection({setIsOpenFormEditSection, sectionTitle, setSections, sections, sectionId, idx, setIsLoading}) {
  const dispatch = useDispatch();
  const globalCourse = useSelector(state => state.courses.courseData);
  const [newSectionTitle, setNewSectionTitle] = useState(sectionTitle);
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    bgColor: 'green'
  });

  const updateSectionMutate = useMutation(
    (sectionData) => callApiUpdateSection(sectionData),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        console.log(data);
        // Assuming sectionData contains sectionId
        const sectionIdx = sections.findIndex(s => s._id === sectionId);

        const newSections = [...sections];
        const updatedSection = {
          ...newSections[sectionIdx],
          name: data?.metadata?.name // Safely update name if data.metadata.name exists
        };

        newSections[sectionIdx] = updatedSection;
        setSections(newSections);
        dispatch(setSectionsData(newSections));
        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);
        console.error('Failed to update section:', error);
      }
    }
  );
  
  const onSaveSection = () => {
    if (newSectionTitle === "" || newSectionTitle === null) {
      setNotification({
        message: 'Section title cannot be empty',
        visible: true,
        bgColor:'red'
      });
      return;
    }
    // if (sections !== null) {
      // setSections(newSections);
      updateSectionMutate.mutate({
        _id: sectionId,
        courseId: globalCourse._id,
        name: newSectionTitle,
      });
    // }
    setNewSectionTitle(null);
    setIsOpenFormEditSection(false);
  }

  return (
    <FormEditSectionWrapper>
      <Notification message={notification?.message} visible={notification?.visible} bgColor={notification?.bgColor} onClose={() => setNotification({message: '', visible: false, bgColor: 'green'})}/>
      <div className="edit-section-content">
        <div className="edit-section_title"> Section {idx + 1}: </div>
        <input type="text" value={newSectionTitle} onChange={(e) => setNewSectionTitle(e.target.value)}/>
      </div>
      <div className="edit-section_button">
        <Button 
            style={{ color: "var(--color-gray-500)", fontWeight: "700"}} 
            bgColor="var(--color-white)" 
            hoverBgColor="var(--color-white)"
            padding="5px"
            onClick={() => setIsOpenFormEditSection(false)}>Cancel</Button>
          <Button 
            style={{ fontWeight: "700" }}
            onClick={onSaveSection}>Save Section</Button>
      </div>
    </FormEditSectionWrapper>
  );
}

const FormEditSectionWrapper = styled.div`
  margin: 10px;
  border: 1px solid var(--color-gray-400);
  padding: 10px 20px 0 20px;
  background-color: var(--color-white);
  

  .edit-section-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    .edit-section_title {
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

  .edit-section_button {
    display: flex;
    justify-content: flex-end;
    margin: 10px 10px;
    gap: 30px;
  }
`