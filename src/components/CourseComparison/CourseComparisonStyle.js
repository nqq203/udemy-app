import styled from "styled-components";

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
  }

  .course-comparison-content {
    display: flex;
    flex: 2;
    justify-content: space-between;
    align-items: center;
  }

  .ratings, .price {
    margin: 0 32px 0 24px;
    font-weight: 700;
    font-size: 14px;
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
`;
