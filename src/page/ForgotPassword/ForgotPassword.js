import { SignUpWrapper, SignUpTitle, CustomFormGroup, InputLabel, Input, FormControl } from "./ForgotPasswordStyle";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button/Button";
import Notification from "../../components/Notification/Notification";
import { useMutation } from "react-query";
import { callApiForgotPassword } from "../../api/user";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignUpState, setMessage } from "../../redux/authSlice";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
export default function SignUp() {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefEmail = useRef(null);
  const [focusInputEmail, setFocusInputEmail] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    bgColor: 'green'
  });


  function onBlurInput() {
    if (email === '' || !email)
      setFocusInputEmail(false);
    return
  }


  const mutation = useMutation(callApiForgotPassword, {
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        dispatch(setSignUpState(true));
        dispatch(setMessage(data.message));
        setShowNotification(true);
        setEmailSent(true); 
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

    console.log("hi",email)
    mutation.mutate(email);
    
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <SignUpWrapper>
      {emailSent ? ( // Kiểm tra nếu email đã được gửi, hiển thị thông báo
        <div className="notification-box">
          <MarkEmailReadIcon style={{ fontSize: "30px" }} />
          <div className="notification-text">
            <h4>Reset password email sent</h4>
            <p>You should soon receive an email allowing you to reset your password. Please make sure to check your spam and trash if you can't find the email.</p>
          </div>
        </div>
      ) : ( 
        <>
          <Notification
            message={notification?.message}
            visible={notification?.visible}
            bgColor={notification?.bgColor}
            onClose={() => setNotification({ message: '', visible: false, bgColor: 'green' })} />
          <SignUpTitle>Forgot Password</SignUpTitle>
          <CustomFormGroup>
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
          </CustomFormGroup>
          <Button
            bgColor={'var(--color-purple-300)'}
            fontWeight={700}
            hoverBgColor={'var(--color-purple-400)'}
            onClick={handleOnSubmitRegistration}>Send Email</Button>
          <div className="signup-note">
            <p>By signing up, you agree to our <u>Terms of Use</u> and <u>Privacy Policy</u></p>
          </div>
          <div className="signup-exist-account">
            <p>Already have an account?</p>
            <p className="signup-exist-account-link">Login</p>
          </div>
        </>
      )}
    </SignUpWrapper>
  );
}