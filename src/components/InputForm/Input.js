import { useState } from "react";
import styled from "styled-components";
// import Button1 from "../../Buttons/Button1/Button1";
import { Button } from "../Button/Button";
const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const InptBoxDiv = styled.div`
  display: flex;
  align-items: center;
`;

const InptTxt = styled.div`
  padding: 1.0rem;
  border-right: 1px solid var(--color-gray-300);
  background-color: var(--lighish-white);
`;

const Label = styled.label`
  color: var(--color-gray-300);
  font-size: 1rem;
  font-weight: 700;
`;

const InptBox = styled.div`
  width: 100%;
  border: 1px solid var(--color-gray-300);
  margin: 0.35rem 0;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Count = styled.div`
  padding: 0.5rem 1rem;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 0.5rem;
  cursor: pointer;
`;

const Inpt = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  color: var(--color-gray-300);
  outline: none;
  border: none;

  &:disabled {
    cursor: not-allowed;
  }

  &::placeholder {
    font-size: 1rem;
    color: var(--color-gray-300);
    font-weight: 500;
  }
`;

const Input = (props) => {
  const [countNumber, setCountNumber] = useState(0);
  const {
    type = "text",
    label = null,
    inptTxt = null,
    name = "",
    icon = "",
    iconPosition = "left",
    placeholderTxt = "",
    state = "",
    btnTxt = "",
    btnClick = () => {},
    onChange = () => {},
    inptBoxCss = {},
    imgCss = {},
    extraCss = {},
    btnCss = {},
    count = false,
    countLimit = null,
    showCount = true,
    disabledInpt = false,
    disabledBtn = false,
  } = props;

  const changeHandler = (e) => {
    onChange(e);
    if (countLimit && e.currentTarget.value.length > countLimit) {
      return;
    }
    setCountNumber(e.currentTarget.value.length || 0);
  };

  return (
    <OuterDiv>
      {label ? <Label>{label}</Label> : null}
      <InptBoxDiv>
        <InptBox style={inptBoxCss}>
          {inptTxt ? <InptTxt>{inptTxt}</InptTxt> : null}
          {icon && iconPosition === "left" ? (
            <Icon src={icon} style={imgCss} />
          ) : (
            ""
          )}
          <Inpt
            type={type}
            name={name}
            placeholder={placeholderTxt}
            style={extraCss}
            defaultValue={state}
            onChange={changeHandler}
            maxLength={countLimit}
            disabled={disabledInpt}
          />
          {count ? (
            <Count>{showCount ? countNumber : countLimit - state?.length}</Count>
          ) : null}
          {icon && iconPosition === "right" ? (
            <Icon src={icon} style={imgCss} />
          ) : (
            ""
          )}
        </InptBox>
        {btnTxt ? (
          <Button
          bgColor={'var(--color-purple-300)'}
          hoverBgColor={'var(--color-purple-500)'}
          color={'var(--white)'}
          fontWeight={700}
          padding={'1.3rem'}
          width={'30%'}
          height={'100%'}
          onClick={btnClick}
          disabled={disabledBtn}
          margin={'0'}
        >
          {btnTxt}
        </Button>
        
        ) : (
          ""
        )}
      </InptBoxDiv>
    </OuterDiv>
  );
};

export default Input;
