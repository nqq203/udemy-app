import { SignUpWrapper, SignUpTitle, SignUpStateWrapper, CustomFormGroup, InputLabel, Input, FormControl } from "./ResetPasswordStyle";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button/Button";
import Notification from "../../components/Notification/Notification";
import { useMutation } from "react-query";
import { callApiCheckTokenValidity, callApiResetPassword } from "../../api/user"; 
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignUpState, setMessage } from "../../redux/authSlice";
import ErrorIcon from '@mui/icons-material/Error';
import { PropagateLoader } from "react-spinners";
export default function ResetPassword() {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefPassword = useRef(null);
  const [focusInputPassword, setFocusInputPassword] = useState(false);
  const [passwordState, setPasswordState] = useState({
    bar_1: 'var(--color-gray-200)',
    bar_2: 'var(--color-gray-200)',
    bar_3: 'var(--color-gray-200)',
    bar_4: 'var(--color-gray-200)',
    note: ''
  });
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    bgColor: 'green'
  });
  const [invalidToken, setInvalidToken] = useState(false);
  const { token } = useParams(); 
  const [isLoading, setIsLoading] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  function onBlurConfirmInput() {
   
    if (confirmPassword === '' || !confirmPassword)
      setFocusInputPassword(false);
    else
      checkPasswordMatch(); 
  }

  function checkPasswordMatch() {
   
    const match = password === confirmPassword;
    setPasswordMatch(match);
  }

  useEffect(() => {
    async function checkTokenValidity() {
      try {
        const response = await callApiCheckTokenValidity(token);
        if (!response.success) {
          console.error("Invalid token:", response.message);
          setInvalidToken(true);
        }
      } catch (error) {
        console.error("Error checking token validity:", error);
        setInvalidToken(true);
      } finally {
        setIsLoading(false); // Set loading state to false when API call completes
      }
    }

    if (token) {
      checkTokenValidity();
    }
  }, [token]);

  useEffect(() => {
    checkPasswordStrong(password);
  }, [password]);

  function checkPasswordStrong(password) {
    const veryStrong = /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{10,}$/;
    const strongUppercase = /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,}$/;
    const strongSpecial = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{10,}$/;
    const medium =  /^(?=.*[a-z])(?=.*\d)[a-z\d]{10,}$/;
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

  function onBlurInput() {
    if (password === '' || !password)
      setFocusInputPassword(false);
  }

  const mutation = useMutation(callApiResetPassword, {
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        dispatch(setSignUpState(true));
        dispatch(setMessage(data.message));
        navigate("/sign-in");
      }
      else {
        setNotification({
          message: data.message,
          visible: true,
          bgColor: 'red'
        });
      }
    }
  });
  
  async function handleOnSubmitRegistration() {
    console.log("confirm password: ", confirmPassword, password);
    if (password.length < 10) {
      setNotification({
        message: 'Password must be at least 10 characters long',
        visible: true,
        bgColor: 'red'
      });
      return;
    }
    if (!passwordMatch) {
      setNotification({
        message: 'Passwords do not match',
        visible: true,
        bgColor: 'red'
      });
      return;
    }
    const resetData = {
      token: token,
      password: password
    };
    mutation.mutate(resetData);
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);


    return (
      <SignUpWrapper>
        {isLoading ? (
          <div className="container" style={{ textAlign: "center", padding: "20px" }}>
            <PropagateLoader color="var(--color-blue-300)" />
          </div>
        ) : (
          invalidToken ? (
            <div className="notification-box">
              <ErrorIcon style={{ fontSize: "30px" }} />
              <div className="notification-text">
                <h4>Your token is invalid or expired</h4>
                <p>Please try again</p>
              </div>
            </div>
          ) : (
            <>
              <Notification 
                message={notification?.message} 
                visible={notification?.visible} 
                bgColor={notification?.bgColor} 
                onClose={() => setNotification({message: '', visible: false, bgColor: 'green'})}
              />
              <SignUpTitle>Reset Password</SignUpTitle>
              <CustomFormGroup>
                <FormControl >
                  <InputLabel htmlFor="sign-up-password" focus={focusInputPassword}>Password</InputLabel>
                  <Input 
                    id="sign-up-password" 
                    type="password"
                    onFocus={() => setFocusInputPassword(true)}
                    onBlur={onBlurInput}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    focus={focusInputPassword}
                    // ref={inputRefPassword} 
                  />
                </FormControl>
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
                <FormControl>
                  <InputLabel htmlFor="sign-up-confirm-password" focus={focusInputPassword}>
                    Confirm Password
                  </InputLabel>
                  <Input 
                    id="sign-up-confirm-password" 
                    type="password"
                    onFocus={() => setFocusInputPassword(true)}
                    onBlur={onBlurConfirmInput}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    focus={focusInputPassword}
                  />
                </FormControl>
              </CustomFormGroup>
              <Button
                bgColor={'var(--color-purple-300)'}
                fontWeight={700}
                hoverBgColor={'var(--color-purple-400)'}
                onClick={handleOnSubmitRegistration}
              >
                Reset
              </Button>
              <div className="signup-note">
                <p>By signing up, you agree to our <u>Terms of Use</u> and <u>Privacy Policy</u></p>
              </div>
            </>
          )
        )}
      </SignUpWrapper>
    );

  }