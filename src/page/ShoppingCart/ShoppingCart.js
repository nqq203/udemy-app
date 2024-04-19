import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import Input from "../../components/InputForm/Input";
import CheckoutCourseCard from "../../components/Card/CheckoutCourseCard";
import lock from "../../page/icons/lock.png";
import CrossIcon from "@mui/icons-material/Close";
import emptyCartImg from "../../page/icons/emptyCart.png";
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
} from "./ShoppingCartStyle";
import { useQuery } from "react-query";
import { callApiGetCart } from "../../api/cart";
import { useAuth } from "../../context/AuthContext";
const ShoppingCart =   () => {
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { isAuthenticated } = useAuth()
  // const token = localStorage.getItem('accessToken')
  // console.log(token)
  // let totalPrice = 0
  const { data, isSuccessFetch, isLoading,isError, refetch } = useQuery(
    "cart", () => callApiGetCart(), {
      onSuccess: (data) => {
        console.log(localStorage.getItem('accessToken'));
        console.log(data);
      },
      onError: (error) => {
        console.error("Error fetching data:", error);
      },
      staleTime: Infinity,
    }
  )
  useEffect(() => {
    if(!isAuthenticated) {
      // setUsername(null)
    }
    refetch()
  }, [isAuthenticated])  


  useEffect(() => {
    console.log("data", data)
      setCartData(data?.metadata)
  }, [data, isSuccessFetch, cartData])

  useEffect(() => {
    setTotalPrice(cartData?.map((item) => item.price).reduce((a, b) => a + b, 0) || 0);
  }, [cartData, totalPrice]);
  const [filteredItems, setFilteredItems] = useState([]);
  // let cartData = [


  const clearCouponHandler = () => {
    setAppliedCoupon("");
  };

  const setCouponHandler = (e) => {
    setCoupon(e.target.value);
  };

  const submitCoupon = () => {
    setAppliedCoupon(coupon);
    console.log(coupon, "coupon");
  };

  return (
    <OuterDiv>
      <InnerDiv>
        <Title>Shopping Cart</Title>
        {cartData?.length > 0 ? (
          <BoxContainer>
            <Box1>
              <Count> {cartData?.length || 0} courses in Cart</Count>
              <CourseContainer>
                {cartData?.map((item) => {
                  return <CheckoutCourseCard data={item} key={item.id} />;
                })}
              </CourseContainer>
            </Box1>
            <Box2>
              <TotalText>Total:</TotalText>
              <TotalDiscount>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice)}
              </TotalDiscount>
              
              <TotalText>Coupon code</TotalText>
              {appliedCoupon ? (
                <CouponBox>
                  <Icon
                    src={CrossIcon}
                    alt="close icon"
                    onClick={clearCouponHandler}
                  />
                  <CouponCode>
                    <b>{appliedCoupon}</b> is applied
                  </CouponCode>
                </CouponBox>
              ) : (
                ""
              )}
              <Input
                type="text"
                btnTxt="Apply"
                onChange={setCouponHandler}
                btnClick={submitCoupon}
              />
              <Link to="/payment">
                        <Button 
                            width='100%' 
                            fontWeight="700" 
                            bgColor="var(--color-purple-300)"
                            hoverBgColor="var(--color-purple-400)"
                        >
                            Checkout
                        </Button>
              </Link>
            </Box2>

          </BoxContainer>
        ) : (
          <EmptyBody>
            <CartItemsLength>
              <span>{cartData?.length}</span>
              <span>Courses in Cart</span>
            </CartItemsLength>
            <CartBox>
              <EmptyCartImage src={emptyCartImg} alt="empty cart" />
              <div className="emptyCartTxt">
                Your cart is empty. Keep shopping to find a course!
              </div>
              <Link to="/">
                <Button
                  bgColor="var(--color-purple-300)"
                  color="var(--color-white)"
                  hoverBgColor="var( --color-purple-400)"
                  width="150px"
                  height="50px"
                >
                  Keep shopping
                </Button>
              </Link>
            </CartBox>
            {/* <WhitelistedCourses>
              <WhitelistedTitle>Recently wishlisted</WhitelistedTitle>
              {whitelistedCourses?.map((item) => {
                return (
                  <CheckoutCourseCard
                    data={item}
                    key={item.id}
                    extraCss={{
                      margin: "1rem 0",
                      border: "none",
                      borderTop: "1px solid var(--color-gray-200)",
                      justifyContent: "space-between",
                    }}
                  />
                );
              })}
            </WhitelistedCourses> */}
          </EmptyBody>
        )}
      </InnerDiv>
    </OuterDiv>
  );
};

export default ShoppingCart;
