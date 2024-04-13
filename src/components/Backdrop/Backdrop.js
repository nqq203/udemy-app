import styled from "styled-components"

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Adjust the opacity as needed
  z-index: 1; // Ensure it's below the popup but above other content
`;