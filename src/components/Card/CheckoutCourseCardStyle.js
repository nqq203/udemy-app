import styled from "styled-components";
import { Link } from "react-router-dom";

export const OuterDiv = styled(Link)`
  width: 100%;
  padding: 5px;
  margin: 10px 0;
  display: flex;
  align-items: flex-start;
  border: 1px solid var(--color-gray-500);
  color: var(--color-gray-300);
  text-decoration: none;
`;

export const Box1 = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;

@media screen and (max-width: 426px) {
  .outerDiv {
    display: flex;
    flex-wrap: wrap;
  }
  .box1 {
    display: flex;
    flex-wrap: wrap;
  }
  .imgBox {
    width: 100%;
  }
  .box23 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

`;

export const ImgBox = styled.div`
  width: 150px;
  height: 100%;
  margin: 0 1rem;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Details = styled.div``;

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

export const Authors = styled.div`
  font-size: 0.9rem;
`;

export const Ratings = styled.div`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  color: var(--color-gray-300);
`;

export const RatingStats = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
`;

export const RatingNumber = styled.span`
  color: var(--color-orange-400);
  font-weight: 700;
`;

export const RatingCount = styled.span`
  font-size: 0.8rem;
`;

export const CourseDetails = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 25px;
  padding-left: 0px;
  font-size: 0.8rem;
  color: var(--color-gray-300);
`;

export const Box23 = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 1rem;
`;

export const ActionBox = styled.div`
  margin: 0 1rem;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const PriceDetails = styled.div`
  font-size: 1rem;
  display: flex-end;
`;

export const Price = styled.div`
  color: var(--color-purple-300);
  font-weight: 700;
`;

export const PriceTagIcon = styled.img`
  width: 16px;
  height: 16px;
  margin: 0 1rem;
`;

export const Discount = styled.div`
  font-size: 0.9rem;
  text-decoration: line-through;
  color: var(--color-gray-300);
`;
