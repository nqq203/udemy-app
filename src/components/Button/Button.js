import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({bgColor}) => bgColor ? bgColor : 'var(--color-gray-500)'};
  border: ${({border}) => border ? border : 'none'};
  color: ${({color}) => color ? color : 'var(--color-white)'};
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : '500'};
  font-size: ${({fontSize}) => fontSize ? fontSize : '15px'};
  width: ${({width}) => width ? width : "auto"};
  height: ${({height}) => height ? height : 'auto'};
  padding: ${({padding}) => padding ? padding : '15px'};
  margin: ${({margin}) => margin ? margin : 0};
`