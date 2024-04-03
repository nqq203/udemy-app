import React from 'react';
import Tag from '../Tags/Tags';
import { Button } from '../../components/Button/Button';
import labelIcon from '../../page/icons/label.png';
import {
  OuterDiv,
  Box1,
  ImgBox,
  Img,
  Details,
  Title,
  Authors,
  Ratings,
  RatingStats,
  RatingNumber,
  RatingCount,
  CourseDetails,
  Box23,
  ActionBox,
  PriceDetails,
  Price,
  PriceTagIcon,
  Discount,
} from './CheckoutCourseCardStyle';

const CheckoutCourseCard = (props) => {
  const { data, extraCss } = props;

  const {
    id = 1,
    img = '',
    link = '/',
    ttl = 'xxx',
    authors = ['xxx'],
    ratings = { totalratings: 0, count: 0 },
    duration = 0,
    lectures = 0,
    level = 'All',
    price = 0,
    discount = 0,
    couponApplied = 'xxx',
    bestSeller = false,
  } = data;

  return (
    <OuterDiv to={link} style={extraCss}>
      <Box1>
        <ImgBox>
          <Img src={img} alt='course thumbnail' />
        </ImgBox>
        <Details>
          <Title>{ttl}</Title>
          <Authors>By {authors?.join(', ')?.toString()}</Authors>
          <Ratings>
            {bestSeller ? <Tag /> : ''}
            <RatingStats>
              <RatingNumber>{ratings.totalratings}</RatingNumber>
              <RatingCount>({ratings.count} ratings)</RatingCount>
            </RatingStats>
          </Ratings>
          <CourseDetails>
            <span>{duration} total hours</span>
            <span className='crsDet, css.mid'>{lectures} lectures</span>
            <span>{level} Levels</span>
          </CourseDetails>
        </Details>
      </Box1>
      <Box23>
        <ActionBox>
          <Button
            bgColor='var(--color-white)'
            fontSize='0.9rem'
            fontWeight='400'
            color='var(--color-purple-300)'
            margin='0.2rem'
            padding='0'
          >
            Remove
          </Button>

          <Button
            bgColor='var(--color-white)'
            fontSize='0.9rem'
            fontWeight='400'
            color='var(--color-purple-300)'
            margin='0.2rem'
            padding='0'
          >
            Save for Later
          </Button>
        </ActionBox>
        <PriceDetails>
          <Price>
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
            }).format(price)}
          </Price>
          {/* <PriceTagIcon src={labelIcon} alt='price tag' /> */}
          <Discount>
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
            }).format(discount)}
          </Discount>
        </PriceDetails>
      </Box23>
    </OuterDiv>
  );
};

export default CheckoutCourseCard;
