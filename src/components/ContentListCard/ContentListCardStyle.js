import styled from "styled-components";

export const ContentListCardWrapper = styled.div`
  h1 {
    margin: 0 0 1rem 0;
  }
  margin: 5vh 40vw 5vh 12vw;
  border: 1px solid #e0e0e0;
  padding: 1.5rem;

  ul {
    list-style: none;
    margin: 0 0;
    padding: 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
  }

  li {
    padding: 3px 0;
    width: 300px;
    display: flex;
  }

  img {
    width: 12px;
    padding-right: 20px;
  }
`;
