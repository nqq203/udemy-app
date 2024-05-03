import styled from 'styled-components';
import { FormGroup } from '@mui/material';

export const SignUpWrapper = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 400px;
  font-family: var(--font-stack-heading);

  .signup-note {
    font-size: 12px;
    border-bottom: 1px solid var(--color-gray-250);
    padding: 5px 0;
    
    p {
      text-align: center;
    }
  }

  .signup-exist-account {
    font-size: 14px;
    display: flex;
    gap: 5px;
    
    margin: 0 auto;
  }

  .signup-exist-account-link {
    color: var(--color-blue-300);
    font-weight: 600;
    text-decoration: underline;
  }

  .signup-exist-account-link:hover {
    color: var(--color-blue-400);
    cursor: pointer;
  }
  margin-bottom: 10vh;
`

export const SignUpTitle = styled.h3`
  font-size: 17px;
  margin-top: 5vh;
`

export const SignUpStateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 15px;
  margin-bottom: 20px;
  position: relative;

  .signup-state-bar {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }

  .signup-state-bar .signup-state {
    width: 40px;
    height: 4px;
    background-color: var(--color-gray-200);
  }

  .signup-state-infor .signup-state-note {
    font-size: 12px;
    text-align: center;
    position: absolute;
    top: -6px;
  }
`

export const CustomFormGroup = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 0 auto;
  gap: 10px;
`

export const InputLabel = styled.label`
  position: absolute;
  cursor: text;
  left: 20px;
  top: ${({ focus }) => (focus ? '8px' : '20px')};
  font-size: ${({ focus }) => (focus ? '12px' : '15px')};
  color: var(--color-gray-550);
  font-weight: 700;
  transition: all 0.3s ease;
`

export const Input = styled.input`
  border: 1px solid var(--color-gray-500);
  font-size: 15px;
  outline: none;
  border: none;
  padding: 0;
  padding-top: 5px;
  font-weight: 500;
  line-height: 1.5;
`

export const FormControl = styled.div`
  padding: 20px 20px 15px 20px;
  border: 1px solid var(--color-gray-500);
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: text;
`