import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  width: auto;
  padding: 24px 1vw 0;
  height: 270px;
  background-color: var(--color-gray-550);
`

export const FooterTop = styled.div`
  position: relative;
`

export const FooterTopLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
  ul {
    display: flex;
    flex-direction: column;
  }

  ul li {
    list-style: none;
    margin-top: 10px;
  }

  ul li a {
    color: var(--color-white);
    text-decoration: none;
  }

  ul li a:hover {
    color: var(--color-white);
    text-decoration: underline;
  }

  .footer-first-item {
    margin-top: 0;
  }
`

export const FooterTopRight = styled.div`
  position: absolute;
  padding-right: 40px;
  right: 10px;
  top: 0;
  button {
    padding: 0 20px;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
    background-color: var(--color-gray-550);
    color: var(--color-white);
    border: 1px solid var(--color-white);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
`

export const FooterBottom = styled.div`
  color: var(--color-white);
  position: relative;
  font-size: 13px;

  .footer-logo {
    position: absolute;
    left: 40px;
    top: 110px;
  }

  .footer-copyright {
    position: absolute;
    right: 10px;
    top: 110px;
    padding-right: 40px;
  }
`