import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/InputForm/Input";
import { Button } from "../../components/Button/Button";
import fImg from "../icons/facebook.svg";
import gImg from "../icons/google.svg";
import aImg from "../icons/apple-logo.svg";
import email from "../icons/email.png";
import lock from "../icons/lock.png";
import Notification from "../../components/Notification/Notification";
import { callApiGetSessionMessage, callApiLogin, callApiLoginWithFacebook, callApiLoginWithGoogle } from "../../api/user";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { setMessage, setSignUpState } from "../../redux/authSlice";
import Cookies from 'js-cookie';

import {
  OuterDiv,
  LoginBox,
  Title,
  BoxBody,
  Hr,
  OAuth,
  Block,
} from "./SignInStyle";

const SignIn = () => {
  const { setIsAuthenticated, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isSignUp = useSelector(state => state.auth.signUp);
  const signUpMessage = useSelector(state => state.auth.message);
  const dispatch = useDispatch();
  const [notification, setNotification] = useState({
  });
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const oauth = [
    { img: fImg, txt: "Continue with Facebook", link: "/facebook-auth" },
    { img: gImg, txt: "Continue with Google", link: "/google-auth" },
    { img: aImg, txt: "Continue with Apple", link: "/apple-auth" },
  ];

  let changeHandler = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const loginMutation = useMutation(
    (loginDetails) => callApiLogin(loginDetails), // This function should return a Promise from your API call
    {
      onSuccess: (data) => {
        console.log(data);
        if (data.success) {
          // Handle successful login here
          // const role = JSON.stringify(data.metadata.ROLE);
          console.log(data.metadata);

          const { email, fullName, role, _id } = data.metadata.userInfo;
          localStorage.setItem('accessToken', data.metadata.accessToken);
          localStorage.setItem('token', data.metadata.accessToken);
          localStorage.setItem('email', email);
          localStorage.setItem('fullname', fullName);
          localStorage.setItem('role', role);
          localStorage.setItem('_id', _id);
          localStorage.setItem('role', role);
          window.location.href = "http://localhost:3030";
          setIsAuthenticated(true);
        }
        else {
          setNotification({
            message: data.message,
            visible: true,
            bgColor: 'red'
          });
        }
      },
    }
  );

  const submitHandler = async () => {
    if (!state.email.includes("@")) {
      setNotification({
        message: "Email must include @",
        visible: true,
        bgColor: 'red'
      });
      return;
    }
    if (state.password.length < 10) {
      setNotification({
        message: "Password must be at least 10 characters",
        visible: true,
        bgcolor: 'red',
      });
      return;
    }

    loginMutation.mutate({ email: state.email, password: state.password });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    console.log(isSignUp);
    if (isSignUp === true) {
      setNotification({
        message: signUpMessage,
        visible: true,
        bgColor: 'green'
      });
      dispatch(setMessage(''));
      dispatch(setSignUpState(false));
    }
  }, [signUpMessage, isSignUp]);

  async function signInOauth(id) {
    if (id === 0) {
      await callApiLoginWithFacebook();
    }
    else if (id === 1) {
      await callApiLoginWithGoogle();
    }
    else if (id === 2) {

    }
  }

  return (
    <OuterDiv>
      <Notification message={notification.message} visible={notification.visible} bgColor={notification.bgColor} onClose={() => setNotification({ message: '', visible: false, bgColor: 'green' })} />
      <LoginBox>
        <Title>Log in to your Udemy account</Title>
        <Hr />
        <BoxBody>
          {oauth?.map((item, id) => {
            return (
              <OAuth key={id} onClick={() => signInOauth(id)}>
                <img src={item?.img} alt="login img" className="icon" />
                <span className="txt">{item?.txt}</span>
              </OAuth>
            );
          })}
          <Input
            type="email"
            name="email"
            state={state.email}
            icon={email}
            placeholderTxt="Email"
            onChange={changeHandler}
          />
          <Input
            type="password"
            name="password"
            state={state.password}
            icon={lock}
            placeholderTxt="Password"
            onChange={changeHandler}

          />
          <Button
            padding={"15px"}
            margin={"10px 0 0 0"}
            width={"100%"}
            bgColor={'var(--color-purple-300)'}
            fontWeight={700}
            hoverBgColor={'var(--color-purple-400)'}
            onClick={submitHandler}
          >Login</Button>
          <Block>
            <span className="blckTxt">or</span>
            <Link to="/forgot-password" className="anchor">
              Forgot password
            </Link>
          </Block>
          <Block>
            <span className="blckTxt">Dont have an account?</span>
            <Link to="/sign-up" className="anchor">
              <b>Signup</b>
            </Link>
          </Block>
          <Block>
            <Link to="/sign-in" className="anchor">
              <b>Login with your organization</b>
            </Link>
          </Block>
        </BoxBody>
      </LoginBox>
    </OuterDiv>
  );
};

export default SignIn;
