import styled from "styled-components";

export const SideBarCardWrapper = styled.div`
  max-width: 1184px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0;
  .course-thumbnail {
    width: 100%;
    height: 191px;
  }

  .sidebar-container {
    position: ${({isFixed}) => isFixed ? 'fixed' : 'absolute'};
    width: 23rem;
    margin-left: 796px;
    display: block;
    top: 32px;
    padding: 0;
    z-index: 1;
    border-bottom: 1px solid #d1d7dc;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08);
    background-color: #fff;
  }

  .fixed-sidebar-container {

  }

  .course-price {
    font-weight: 700;
    font-family: var(--font-stack-heading);
    font-size: 32px;
  }

  .purchase-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    padding: 24px;
  }

  .coupon-section {
    display: flex;
    width: 100%;
  }

  .coupon-input {
    height: 43px;
    border: 1px solid #2d2f31;
    width: 70%;
  }

  input.coupon-input:focus {
    outline: none /* Change border color when focused */
  }

  .add-to-cart-btn:hover {
    background-color: #8710d8;
  }

  .buy-now-btn:hover {
    background-color: var(--color-gray-200);
  }
  .apply-coupon-btn:hover {
    background-color: var(--color-gray-400);
  }
  ul {
    list-style: none;
  }
`;
