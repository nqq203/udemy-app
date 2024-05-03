import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @keyframes onAutofillStart {
    from {}
    to {}
  }

  input:-webkit-autofill {
    animation-name: onAutofillStart;
    animation-fill-mode: both;
  }

  /* Other global styles can be placed here */
`;