import styled from 'styled-components';

export const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 20px;
  width: 100%;

  input[type="text"] {
    padding: 15px 20px;
    border-radius: 30px;  
    width: 100%;
    padding-left: 4vw;
    font-size: 15px;
    background-color: var(--color-gray-100);
    border: 1px solid var(--color-gray-300);  
  }

  button {
    padding: calc(1vw - 12px) calc(1vw - 17px);
    cursor: pointer;
    position: absolute;
    left: 1vw;
    background-color: var(--color-gray-100);
    border: none;
    border-radius: 50%;
  }
`
