import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import { useState } from "react";

export default function FormEditSection({setIsOpenFormEditSection, sectionTitle, setSections, sections, sectionId, idx}) {
  const [newSectionTitle, setNewSectionTitle] = useState(sectionTitle);

  const onSaveSection = () => {
    if (newSectionTitle === "" || newSectionTitle === null) {
      return;
    }
    if (sections !== null) {
      const sectionIdx = sections.findIndex(s => s.sectionId === sectionId);
      const newSections = [...sections];
      newSections[sectionIdx].title = newSectionTitle;
      setSections(newSections);
    }
    setNewSectionTitle(null);
    setIsOpenFormEditSection(false);
  }

  return (
    <FormEditSectionWrapper>
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