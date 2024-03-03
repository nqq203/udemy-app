import styled from "styled-components";
import { FormGroup } from '@mui/material';
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button/Button";

export default function SignUp() {
  const inputRefFullname = useRef(null);
  const inputRefEmail = useRef(null);
  const inputRefPassword = useRef(null);
  const [focusInputFullname, setFocusInputFullname] = useState(false);
  const [focusInputEmail, setFocusInputEmail] = useState(false);
  const [focusInputPassword, setFocusInputPassword] = useState(false);
  const [passwordState, setPasswordState] = useState(0);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function checkPasswordStrong(password) {
    const weakRegex = /^[a-z]{8,}$/;
    const mediumRegex = /^(?=.*[A-Z])[a-zA-Z]{8,}$/;
    const strongRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const veryStrongRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z](?=.*[!@#$%&*])$/

    if (veryStrongRegex.test(password)) {
      return "Very Strong";
    } else if (strongRegex.test(password)) {
        return "Strong";
    } else if (mediumRegex.test(password)) {
        return "Could be Stronger";  
    } else if (weakRegex.test(password)) {
        return "Weak";
    }
  }

  useEffect(() => {
    setPasswordState(checkPasswordStrong(password));
  }, [password])
  
  function onBlurInput() {
    if(password === '')
      setFocusInputPassword(false);
    if (email === '')
      setFocusInputEmail(false);
    if(fullname === '')
      setFocusInputFullname(false);
    return;
  }

  useEffect(() => {
    console.log(passwordState);
  }, [password])

  return (
    <SignUpWrapper>
      <SignUpTitle>Sign up and start learning</SignUpTitle>
      <CustomFormGroup>
        <FormControl onClick={() => inputRefFullname.current.focus()}>
          <InputLabel htmlFor="sign-up-fullname" focus={focusInputFullname}>Full name</InputLabel>
          <Input id="sign-up-fullname" 
            onFocus={() => setFocusInputFullname(true)}
            onBlur={onBlurInput}
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            focus={focusInputFullname}
            ref={inputRefFullname}/>
        </FormControl>
        <FormControl onClick={() => inputRefEmail.current.focus()}>
          <InputLabel htmlFor="sign-up-email" focus={focusInputEmail}>Email</InputLabel>
          <Input id="sign-up-email" 
            onFocus={() => setFocusInputEmail(true)}
            onBlur={onBlurInput}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            focus={focusInputEmail}
            ref={inputRefEmail}/>
        </FormControl>
        <FormControl onClick={() => inputRefPassword.current.focus()}>
          <InputLabel htmlFor="sign-up-password" focus={focusInputPassword}>Password</InputLabel>
          <Input id="sign-up-password" type="password" 
            onFocus={() => setFocusInputPassword(true)}
            onBlur={onBlurInput}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            focus={focusInputPassword}
            ref={inputRefPassword}/>
        </FormControl>
      </CustomFormGroup>
      <SignUpStateWrapper>
        <SignUpState></SignUpState>
        <SignUpState></SignUpState>
        <SignUpState></SignUpState>
        <SignUpState></SignUpState>
      </SignUpStateWrapper>
      <Button 
        bgColor={'var(--color-purple-300)'}
        fontWeight={700}>Sign up</Button>
      <div className="signup-note">
        <p>By signing up, you agree to our <u>Terms of Use</u> and <u>Privacy Policy</u></p>
      </div>
      <div className="signup-exist-account">
        <p>Already have an account?</p>
        <p className="signup-exist-account-link">Login</p>
      </div>
    </SignUpWrapper>
  );
}

const SignUpWrapper = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 400px;

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
  margin-bottom: 10vh;
`

const SignUpTitle = styled.h3`
  font-size: 17px;
  margin-top: 5vh;
`

const SignUpStateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-top: 15px;
  margin-bottom: 20px;
`

const SignUpState = styled.div`
  width: 40px;
  border-bottom: 4px solid var(--color-gray-300);
  border-radius: 10px 10px 10px 10px;
`

const CustomFormGroup = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 0 auto;
  gap: 10px;
`

const InputLabel = styled.label`
  position: absolute;
  cursor: text;
  left: 20px;
  top: ${({focus}) => (focus ? '8px' : '20px')};
  font-size: ${({focus}) => (focus ? '12px' : '15px')};
  color: var(--color-gray-550);
  font-weight: 700;
  transition: all 0.3s ease;
`

const Input = styled.input`
  border: 1px solid var(--color-gray-500);
  font-size: 15px;
  outline: none;
  border: none;
  padding: 0;
  padding-top: 5px;
  font-weight: 500;
  line-height: 1.5;
`

const FormControl = styled.div`
  padding: 20px 20px 15px 20px;
  border: 1px solid var(--color-gray-500);
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: text;
`

