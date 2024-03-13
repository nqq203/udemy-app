import styled from 'styled-components';

export const Chip = styled.div`
    background-color: ${({bgColor}) => bgColor ? bgColor : 'var(--color-yellow-300)'};
    color: ${({color}) => color ? color : 'var(--color-yellow-500)'};
    font-size: ${({fontSize}) => fontSize ? fontSize : 'small'};
    font-weight: ${({fontWeight}) => fontWeight ? fontWeight : '700'}; 
    padding: ${({padding}) => padding ? padding : '3px 10px'};
    height: ${({height}) => height ? height : '15px'};
    display: flex;
    align-items: center;
    width: max-content;
    border-radius: 0;
    margin-top: 8px;
`