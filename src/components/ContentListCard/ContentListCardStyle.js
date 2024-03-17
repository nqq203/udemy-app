import styled from "styled-components";

export const ContentListCardWrapper = styled.div`
  border: 1px solid #d1d7dc;
  padding-bottom: 16px;
  padding: 24px 0;
  margin-bottom: 32px;

  .course-content-list{
    margin: 0 24px;
  }

  h2 {
    margin: 0 24px 16px;
  }

  ul {
    
    list-style: none;
    margin: 0 0;
    padding: 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
  }

  li {
    font-family: var(--font-stack-text);
    padding: 3px 0;
    width: 300px;
    display: flex;
  }

  img {
    width: 12px;
    padding-right: 20px;
  }
`;
