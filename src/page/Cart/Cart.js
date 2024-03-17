import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import Input from '../../components/InputForm/Input';
import CheckoutCourseCard from '../../components/Card/CheckoutCourseCard';
import lock from '../../page/icons/lock.png';
import CrossIcon from '@mui/icons-material/Close';
import emptyCartImg from '../../page/icons/emptyCart.png';
import {
  OuterDiv,
  InnerDiv,
  Title,
  BoxContainer,
  Box1,
  CourseContainer,
  Count,
  Box2,
  Currency,
  TotalDiscount,
  TotalText,
  CouponBox,
  Icon,
  CouponCode,
  EmptyBody,
  CartItemsLength,
  CartBox,
  EmptyCartImage,
  WhitelistedCourses,
  WhitelistedTitle,
} from './CartStyle';

const Cart = () => {
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const cartData = [];

  const whitelistedCourses = [
    {
      id: 1,
      img: lock,
      link: '/course/python',
      ttl: 'Learn Python: The complete python programming course',
      authors: ['Koushil', 'Nani'],
      ratings: { totalratings: 4.3, count: 3445 },
      duration: 10000,
      lectures: 146,
      level: 'All',
      price: 649,
      discount: 3399,
      couponApplied: 'koushil mankali',
      bestSeller: true,
    },
    {
      id: 2,
      img: lock,
      link: '/course/python',
      ttl: 'Learn Python: The complete python programming course',
      authors: ['Koushil', 'Nani'],
      ratings: { totalratings: 4.3, count: 3445 },
      duration: 10000,
      lectures: 146,
      level: 'All',
      price: 649,
      discount: 3399,
      couponApplied: 'koushil mankali',
      bestSeller: true,
    },
  ];

  const clearCouponHandler = () => {
    setAppliedCoupon('');
  };

  const setCouponHandler = (e) => {
    setCoupon(e.target.value);
  };

  const submitCoupon = () => {
    setAppliedCoupon(coupon);
    console.log(coupon, 'coupon');
  };

  return (
    <OuterDiv>
      <InnerDiv>
        <Title>Shopping Cart</Title>
        {cartData?.length > 0 ? (
          <BoxContainer>
            <Box1>
              <Count>1 Course in Cart</Count>
              <CourseContainer>
                {cartData?.map((item) => {
                  return <CheckoutCourseCard data={item} key={item.id} />;
                })}
              </CourseContainer>
              <div>keep shopping div</div>
            </Box1>
            <Box2>
              <TotalText>Total:</TotalText>
              <Currency>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(600)}
              </Currency>
              <TotalDiscount>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(3399)}
              </TotalDiscount>
              <div className='ttlDisPer'>81% off</div>
              <Button
                link='/checkout'
                txt='Checkout'
                bck='var(--color-purple-300)'
                hovBck='var(--color-purple-500)'
                extraCss={{
                  width: '100%',
                  margin: '1rem 0',
                  padding: '1rem',
                  border: 'none',
                  color: 'var(--white)',
                }}
              />
              <TotalText>Coupon code</TotalText>
              {appliedCoupon ? (
                <CouponBox>
                  <Icon
                    src={CrossIcon}
                    alt='close icon'
                    onClick={clearCouponHandler}
                  />
                  <CouponCode>
                    <b>{appliedCoupon}</b> is applied
                  </CouponCode>
                </CouponBox>
              ) : (
                ''
              )}
              <Input
                type='text'
                btnTxt='Apply'
                onChange={setCouponHandler}
                btnClick={submitCoupon}
              />
            </Box2>
          </BoxContainer>
        ) : (
          <EmptyBody>
            <CartItemsLength>
              <span>{cartData?.length}</span>
              <span>Courses in Cart</span>
            </CartItemsLength>
            <CartBox>
              <EmptyCartImage src={emptyCartImg} alt='empty cart' />
              <div className="emptyCartTxt">
                    Your cart is empty. Keep shopping to find a course!
              </div>
              <Button
                bgColor='var(--color-purple-300)'
                color='var(--color-white)'
                hoverBgColor='var( --color-purple-400)'
                width='150px'
                height='50px'
              >
                Keep Shopping
              </Button>
            </CartBox>
            <WhitelistedCourses>
              <WhitelistedTitle>Recently wishlisted</WhitelistedTitle>
              {whitelistedCourses?.map((item) => {
                return (
                  <CheckoutCourseCard
                    data={item}
                    key={item.id}
                    extraCss={{
                      margin: '1rem 0',
                      border: 'none',
                      borderTop: '1px solid var(--color-gray-200)',
                      justifyContent: 'space-between',
                    }}
                  />
                );
              })}
            </WhitelistedCourses>
          </EmptyBody>
        )}
      </InnerDiv>
    </OuterDiv>
  );
};

export default Cart;
