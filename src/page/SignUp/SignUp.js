import styled from "styled-components";
import { SignUpWrapper, SignUpTitle, SignUpStateWrapper, CustomFormGroup, InputLabel, Input, FormControl } from "./SignUpStyle";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button/Button";
import Notification from "../../components/Notification/Notification";

export default function SignUp() {
  const inputRefFullname = useRef(null);
  const inputRefEmail = useRef(null);
  const inputRefPassword = useRef(null);
  const [focusInputFullname, setFocusInputFullname] = useState(false);
  const [focusInputEmail, setFocusInputEmail] = useState(false);
  const [focusInputPassword, setFocusInputPassword] = useState(false);
  const [passwordState, setPasswordState] = useState({
    bar_1: 'var(--color-gray-200)',
    bar_2: 'var(--color-gray-200)',
    bar_3: 'var(--color-gray-200)',
    bar_4: 'var(--color-gray-200)',
    note: ''
  });
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({
    content: '',
    valid: false
  });

  function checkPasswordStrong(password) {
    const veryStrong = /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    const strongUppercase = /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,}$/;
    const strongSpecial = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    const medium =  /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/;
    const weakNums =  /^\d+$/;
    const weakLetters = /^[A-Za-z]+$/;
    
    if (veryStrong.test(password)) {
      setPasswordState({
        bar_1: 'var(--color-gray-400)',
        bar_2: 'var(--color-gray-400)',
        bar_3: 'var(--color-gray-400)',
        bar_4: 'var(--color-gray-400)',
        note: 'Very strong!'
      });
      return;
    }
    if (strongUppercase.test(password) || strongSpecial.test(password)) {
      setPasswordState({
        bar_1: 'var(--color-gray-400)',
        bar_2: 'var(--color-gray-400)',
        bar_3: 'var(--color-gray-400)',
        bar_4: 'var(--color-gray-200)',
        note: 'Enough strong'
      });
      return;
    }
    if (medium.test(password)) {
      setPasswordState({
        bar_1: 'var(--color-gray-400)',
        bar_2: 'var(--color-gray-400)',
        bar_3: 'var(--color-gray-200)',
        bar_4: 'var(--color-gray-200)',
        note: 'Could be stronger'
      });
      return;
    }
    if (weakLetters.test(password) || weakNums.test(password)) {
      setPasswordState({
        bar_1: 'var(--color-gray-400)',
        bar_2: 'var(--color-gray-200)',
        bar_3: 'var(--color-gray-200)',
        bar_4: 'var(--color-gray-200)',
        note: 'Weak'
      });
      return;
    }

    if (password === '') {
      setPasswordState({
        bar_1: 'var(--color-gray-200)',
        bar_2: 'var(--color-gray-200)',
        bar_3: 'var(--color-gray-200)',
        bar_4: 'var(--color-gray-200)',
        note: ''
      });
      return;
    }
  }

  useEffect(() => {
    checkPasswordStrong(password);
  }, [password])

  function onBlurInput() {
    if (password === '')
      setFocusInputPassword(false);
    if (email === '')
      setFocusInputEmail(false);
    if (fullname === '')
      setFocusInputFullname(false);
    return;
  }
  
  async function handleOnSubmitRegistration() {
    setNotification({
      content: 'Sign up successfully!',
      valid: true
    });
  }

  return (
    <SignUpWrapper>
      <Notification message={notification?.content} visible={notification?.valid} onClose={() => setNotification({content: '', valid: false})}/>
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
            ref={inputRefFullname} />
        </FormControl>
        <FormControl onClick={() => inputRefEmail.current.focus()}>
          <InputLabel htmlFor="sign-up-email" focus={focusInputEmail}>Email</InputLabel>
          <Input id="sign-up-email"
            onFocus={() => setFocusInputEmail(true)}
            onBlur={onBlurInput}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            focus={focusInputEmail}
            ref={inputRefEmail} />
        </FormControl>
        <FormControl onClick={() => inputRefPassword.current.focus()}>
          <InputLabel htmlFor="sign-up-password" focus={focusInputPassword}>Password</InputLabel>
          <Input id="sign-up-password" type="password"
            onFocus={() => setFocusInputPassword(true)}
            onBlur={onBlurInput}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            focus={focusInputPassword}
            ref={inputRefPassword} />
        </FormControl>
      </CustomFormGroup>
      <SignUpStateWrapper>
        <div className="signup-state-bar">
          <div className="signup-state" style={{backgroundColor: passwordState.bar_1}}></div>
          <div className="signup-state" style={{backgroundColor: passwordState.bar_2}}></div>
          <div className="signup-state" style={{backgroundColor: passwordState.bar_3}}></div>
          <div className="signup-state" style={{backgroundColor: passwordState.bar_4}}></div>
        </div>
        <div className="signup-state-infor">
          <div className="signup-state-note">{passwordState.note}</div>
        </div>
      </SignUpStateWrapper>
      <Button
        bgColor={'var(--color-purple-300)'}
        fontWeight={700}
        hoverBgColor={'var(--color-purple-400)'}
        onClick={handleOnSubmitRegistration}>Sign up</Button>
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