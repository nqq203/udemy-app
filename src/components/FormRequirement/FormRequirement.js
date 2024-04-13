import styled from "styled-components";
import { Button } from "../Button/Button";
import { IoMdClose } from "react-icons/io";

export default function FormRequirement({content, btnContent, onSubmit, onClose}) {
  return (
    <FormRequirementWrapper>
      <div style={{position: "absolute", right: "20px", top:"20px", cursor: "pointer"}} onClick={onClose}><IoMdClose size={30}/></div>
      <h3 style={{marginBottom: "50px"}}>Requirements</h3>
      <div className="requirement-content">
        {content}
      </div>
      <Button bgColor="var(--color-purple-300)" hoverBgColor="var(--color-purple-400)"
        onClick={onSubmit}>
        {btnContent}
      </Button>
    </FormRequirementWrapper>
  )
}

const FormRequirementWrapper = styled.div`
  position: fixed;
  top: 8%;
  bottom: 20%;
  display: flex;
  flex-direction: column;
  z-index: 10;
  right: 30%;
  left: 30%;
  background-color: var(--color-white);
  padding: 100px;
  gap: 40px;
  justify-content: center;
`