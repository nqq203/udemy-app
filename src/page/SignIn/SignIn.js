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
import { callApiLogin } from "../../api/user";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
        if (data.success) {
          // Handle successful login here
          // const role = JSON.stringify(data.metadata.ROLE);
          console.log(data);

          const { email, fullName, role, _id } = data.metadata.userInfo;
          localStorage.setItem('accessToken', data.metadata.accessToken);
          localStorage.setItem('email', email);
          localStorage.setItem('fullname', fullName);
          localStorage.setItem('role', role);
          localStorage.setItem('_id', _id);
          setIsAuthenticated(true);
          // localStorage.setItem('role', role);
          navigate("/");
        }
        else {
          setNotification({
            content: data.message,
            visible: true,
          });
        }
      },
    }
  );

  const submitHandler = async () => {
    if (!state.email.includes("@")) {
      setNotification({
        content: "Email must include @",
        visible: true,
      });
      return;
    }
    if (state.password.length < 10) {
      setNotification({
        content: "Password must be at least 10 characters",
        visible: true,
      });
      return;
    }

    loginMutation.mutate({email: state.email, password: state.password});
  };

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <OuterDiv>
      <Notification message={notification.content} visible={notification.visible} onClose={() => setNotification({content: '', visible: false})}/>
      <LoginBox>
        <Title>Log in to your Udemy account</Title>
        <Hr />
        <BoxBody>
          {oauth?.map((item, id) => {
            return (
              <OAuth key={id}>
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
            <Link to="/join/forgot-password" className="anchor">
              Forgot password
            </Link>
          </Block>
          <Block>
            <span className="blckTxt">Dont have an account?</span>
            <Link to="/join/signup" className="anchor">
              <b>Signup</b>
            </Link>
          </Block>
          <Block>
            <Link to="/join/login" className="anchor">
              <b>Login with your organization</b>
            </Link>
          </Block>
        </BoxBody>
      </LoginBox>
    </OuterDiv>
  );
};

export default SignIn;
