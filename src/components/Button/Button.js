import styled from 'styled-components';

export const Button = styled.button`
  font-family: ${({fontFamily}) => fontFamily ? fontFamily : 'var(--font-stack-text)'};
  cursor: pointer;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'var(--color-gray-500)'};
  border: ${({border}) => border ? border : 'none'};
  color: ${({color}) => color ? color : 'var(--color-white)'};
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : '500'};

  font-size: ${({fontSize}) => fontSize ? fontSize : '15px'};
  width: ${({width}) => width ? width : "auto"};
  height: ${({height}) => height ? height : 'auto'};
  padding: ${({padding}) => padding ? padding : '15px'};
  margin: ${({margin}) => margin ? margin : 0};

  &:hover {
    cursor: pointer;
    background-color: ${({hoverBgColor}) => hoverBgColor ? hoverBgColor: 'var(--color-gray-400)'};
  }
`