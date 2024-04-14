import styled, { keyframes, css } from 'styled-components';
import { Button } from '../Button/Button';
import { IoMdClose } from 'react-icons/io';
import React, { useState, useEffect } from 'react';

// Define keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-50px);
  }
`;

// Styled component with enhanced aesthetics
const FormRequirementWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: 25%; // Centered more accurately horizontally
  right: 25%;
  min-height: 20%; // Ensures minimum height
  display: flex;
  flex-direction: column;
  align-items: center; // Aligns content centrally
  justify-content: center;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(245, 245, 255, 0.9));
  border-radius: 10px; // Rounded corners
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 40px; // Adjust padding
  gap: 20px; // Reduce gap between elements
  z-index: 1000;
  overflow: hidden; // Hides anything outside the border radius
  transition: all 0.3s ease-in-out; // Smooth transition for dynamic style changes

  ${props => css`
    animation: ${props.isVisible ? fadeIn : fadeOut} 0.2s ease-out forwards;
  `}

  h3 {
    margin-bottom: 20px; // Reduced bottom margin for header
    color: #333; // Subtle text color for better readability
    font-size: 24px; // Appropriately sized font
  }

  .requirement-content {
    text-align: center; // Center-aligns content text
    font-size: 18px; // Larger font size for readability
    color: #666; // Lighter text color
  }
`;

export default function FormRequirement({ content, btnContent, onSubmit, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer;
    if (!isVisible) {
      timer = setTimeout(() => {
        onClose();
      }, 200);
    }
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <FormRequirementWrapper isVisible={isVisible}>
      <div style={{position: "absolute", right: "20px", top: "20px", cursor: "pointer"}} onClick={handleClose}>
        <IoMdClose size={30} />
      </div>
      <h3>Requirements</h3>
      <div className="requirement-content">
        {content}
      </div>
      <Button bgColor="var(--color-purple-300)" hoverBgColor="var(--color-purple-400)" onClick={onSubmit}>
        {btnContent}
      </Button>
    </FormRequirementWrapper>
  );
}
