import styled from "styled-components";

export const OuterDiv = styled.div`
  width: 100%;
  height: 100%;
  margin: 5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginBox = styled.div`
  width: 330px;
  height: auto;
  margin: auto;
`;

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const BoxBody = styled.div`
`;

export const Hr = styled.div`
  border: none;
  border-bottom: 1px solid var(--color-gray-200);
  margin: 1rem 0;
`;

export const OAuth = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 0.7rem 0;
  padding: 0.5rem;
  border: 1px solid var(--color-gray-300);
  box-shadow: 0 2px 2px 0 rgb(28 29 31 / 24%), 0 0 2px 0 rgb(28 29 31 / 12%);
  cursor: pointer;

  .icon{
    margin-right: 0.5rem;
    width: 30px;
    height: 30px;
  }
`;

export const Block = styled.div`
  margin: 0.7rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: var(--color-purple-400);
    text-decoration: none;
  }

  .blckTxt {
    margin: 0 0.5rem;
  }
  .anchor{
    text-decoration: underline;
    text-underline-offset: 0.2rem;
    text-decoration-color: var(--color-blue-250);
  }
`;
