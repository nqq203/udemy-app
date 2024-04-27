import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

export const CourseDetailWrapper = styled.div`
  position: relative;
  & .course-content-container {
    margin-bottom: 40px;
  }

  & .product-detail-body {
    max-width: 1184px;
    margin: 0 auto;
    padding-top: 32px;
    display: block;
  }

  .product-detail-main-content {
    max-width: 700px;
    margin-left: 48px;
    margin-right: 48px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  & .container {
    height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const PurchaseSectionWrapper = styled.div`
  position: ${({ isFixed }) => (isFixed ? "fixed" : "absolute")};
  width: 23rem;
  margin-left: 840px;
  display: block;
  ${({ bottomPosition }) =>
    bottomPosition ? `bottom: 32px` : "top: 32px"};
  padding: 0;
  z-index: 1;
  border-bottom: 1px solid #d1d7dc;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  box-sizing: border-box;
  padding: 0;
  .course-thumbnail-container {
    width: 100%;
    height: 191px;
  }

  & .course-thumbnail-img {
    width: 100%;
    height: 100%;
  }

  .sidebar-container {
  }

  .fixed-sidebar-container {
  }

  .course-price {
    font-weight: 700;
    font-family: var(--font-stack-heading);
    font-size: 32px;
  }

  .purchase-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    padding: 24px;
  }

  .coupon-section {
    display: flex;
    width: 100%;
  }

  .coupon-input {
    height: 43px;
    border: 1px solid #2d2f31;
    width: 70%;
  }

  input.coupon-input:focus {
    outline: none; /* Change border color when focused */
  }

  .add-to-cart-btn:hover {
    background-color: #8710d8;
  }

  .buy-now-btn:hover {
    background-color: var(--color-gray-200);
  }
  .apply-coupon-btn:hover {
    background-color: var(--color-gray-400);
  }
  ul {
    list-style: none;
  }
`;

export const TitleCardWrapper = styled.div`
  background-color: #2d2f31;
  color: white;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;
  padding-top: 32px;
  padding-bottom: 32px;
  h1 {
    margin: 0;
  }

  & .ratings {
    display: flex;
    align-items: center;
  }

  & .rating-score {
    margin-right: 5px;
  }

  & .rating-icon {
    margin-bottom: -2px;
  }

  .inner-container {
    margin: 0 auto;
    max-width: 1184px;
    box-sizing: border-box;
  }

  .inner-text-container {
    max-width: 700px;
  }

  .course-description {
    font-size: 20px;
  }
`;

export const CourseContentWrapper = styled.div`
  .course-content-stats {
    margin: 8px 0;
    display: block;
  }

  .expand-button {
    background-color: transparent;
    color: #5624d0;
    min-width: auto;
    padding: 0;
    cursor: pointer;
    border: none;
    font-weight: 700;
    font-family: var(--font-stack-heading);
    line-height: 1.2;
    letter-spacing: 0;
  }

  .course-content-length {
    display: flex;
    justify-content: space-between;
  }
`;

export const CourseComparisonWrapper = styled.div`
  border-bottom: 1px solid #d1d7dc;

  .course-comparison-container {
    display: flex;
    flex-direction: row;
    padding: 16px 0;
    position: relative;
    box-sizing: border-box;
    margin: 0;
  }

  .course-comparison-main-content {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    min-width: 180px;
    width: 100%;
    margin: 0 0 0 8px;
    white-space: nowrap;
    overflow-wrap: break-word;
  }

  .course-comparison-content {
    display: flex;
    flex: 2;
    justify-content: space-between;
    align-items: center;
  }

  .ratings,
  .price {
    margin: 0 32px 0 24px;
    font-weight: 700;
    font-size: 14px;
  }

  & .price {
    max-width: 60px;
  }

  .ratings {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .course-comparison-card-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }

  & .course-comparison-image-container {
    width: 10em;
  }

  & .rating-score-container {
    margin-right: 2px;
  }

  & .course-comparison-image {
    width: 100%;
  }

  & .course-comparison-title {
    white-space: normal;
    overflow-wrap: break-word;
    text-decoration: none;
    color: black;
    font-weight: 700;
  }
`;

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

export const ReviewsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  & .rating {
    margin-top: 4px;
  }

  & .show-more-btn:hover {
    background-color: var(--color-gray-200);
  }
`;
