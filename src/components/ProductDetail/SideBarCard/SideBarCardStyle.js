import styled from "styled-components";

export const SideBarCardWrapper = styled.div`
  border: 1px solid #e0e0e0;
  position: ${({ isSticky }) => (isSticky ? "fixed" : "absolute")};
  top: 0;
  right: 0;
  .addToCartBtn:hover {
    background-color: #8710d8;
  }

  ul {
    list-style: none;
  }
`;
