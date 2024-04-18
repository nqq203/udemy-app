import styled from "styled-components";

export const OuterDiv = styled.div`
  width: 100%;
  height: auto;
  min-height: calc(100vh - 70px);
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: var(--gray);
`;

export const InnerDiv = styled.div`
  width: 80%;
  height: auto;
`;

export const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
`;

export const BoxContainer = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

export const Box1 = styled.div`
  width: 73%;
  margin-right: 2rem;
`;

export const CourseContainer = styled.div`
  margin: 5px 0; 
`;

export const Count = styled.div`
  margin: 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
`;

export const Box2 = styled.div`
  width: 25%;
`;

export const Currency = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

export const TotalDiscount = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

export const TotalText = styled.div`
  margin: 0.5rem 0;
  font-size: 1rem;
  font-weight: 700;
`;

export const CouponBox = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Icon = styled.img`
  width: 14px;
  height: 14px;
  cursor: pointer;
  margin: 0 1rem;
`;

export const CouponCode = styled.div`
  font-size: 1rem;
`;

export const EmptyBody = styled.div`
  width: 100%;
  height: auto;
`;

export const CartItemsLength = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 0.5rem;
  font-weight: 700;
`;

export const CartBox = styled.div`
  width: 100%;
  min-height: 300px;
  height: auto;
  padding: 1rem;
  border-radius: 5px;
  border: 2px solid var(--color-gray-150);
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EmptyCartImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

export const WhitelistedCourses = styled.div`
  margin: 1rem 0;
`;

export const WhitelistedTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;
