import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
export const SectionContentWrapper = styled.div`
  .section-name {
    font-size: 16px;
    font-family: var(--font-stack-heading);
    margin: 0;
    cursor: pointer;
    border: 1px solid #e0e0e0;
    background-color: var(--color-gray-100);
    padding: 16px 24px;
    line-height: 17px;
    display: flex;
  }

  .arrowIcon,
  .videoIcon {
    margin-right: 15px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .itemContainer {
    border: 1px solid #e0e0e0;
    margin: 0;
    padding: 16px 24px;
  }

  .item {
    display: flex;
    align-items: center;
    padding: 7px;
    }
`;

export const StyledArrowIcon = styled(IoIosArrowDown)`
  cursor: pointer;
  vertical-align: middle; /* Align the icon vertically with the text */

  /* Apply the spin animation based on the spinning state */
`;
