import React from 'react';
import Tag from '../Tags/Tags';
import { Button } from '../../components/Button/Button';
import labelIcon from '../../page/icons/label.png';
import Rating from '@mui/material/Rating';
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
    imageUrl = '',
    link = '/',
    ttl = 'xxx',
    authors = ['xxx'],
    ratings = 0,
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
          <Img src={imageUrl} alt='course thumbnail' />
        </ImgBox>
        <Details>
          <Title>{ttl}</Title>
          <Authors>By {authors?.join(', ')?.toString()}</Authors>
          <Ratings>
            {bestSeller ? <Tag /> : ''}
            <RatingStats>
              <Rating name="half-rating-read" value={ratings} precision={0.5} readOnly />
              <RatingCount>({ratings} ratings)</RatingCount>
            </RatingStats>
          </Ratings>
          <CourseDetails>
          <li style={{ listStyleType: 'none' }}>{duration} total hours</li>
            <li className='crsDet, css.mid'>{lectures} lectures    </li>
            <li>{level} Levels</li>
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
              currency: 'VND',
            }).format(price)}
          </Price>
          {/* <PriceTagIcon src={labelIcon} alt='price tag' /> */}
          {/* <Discount>
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'VND',
            }).format(discount)}
          </Discount> */}
        </PriceDetails>
      </Box23>
    </OuterDiv>
  );
};

export default CheckoutCourseCard;
