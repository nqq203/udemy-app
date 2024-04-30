import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import Input from "../../components/InputForm/Input";
import CheckoutCourseCard from "../../components/Card/CheckoutCourseCard";
import lock from "../../page/icons/lock.png";
import CrossIcon from "@mui/icons-material/Close";
import emptyCartImg from "../../page/icons/emptyCart.png";
import { PropagateLoader } from "react-spinners";
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
import { callApiDeleteItemCart,callApiGetCart } from "../../api/cart";
import { useAuth } from "../../context/AuthContext";
import Notification from '../../components/Notification/Notification';
import { useMutation } from 'react-query';
const ShoppingCart =   () => {
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth()
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    bgColor: 'green',
  });
  const { data, isSuccessFetch, isLoading,isError, refetch } = useQuery(
    "cart", () => callApiGetCart(), {
      onSuccess: (data) => {
        console.log(localStorage.getItem('accessToken'));
        console.log(data);
        setCartData(data?.metadata);
        setLoading(false);
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


  // useEffect(() => {
  //   console.log("data", data)
  //   setCartData(data?.metadata)
  // }, [data, isSuccessFetch, cartData])

  useEffect(() => {
    setTotalPrice(cartData?.map((item) => item.course.price).reduce((a, b) => a + b, 0) || 0);
  }, [cartData, totalPrice]);


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

  const mutation = useMutation(callApiDeleteItemCart, {
    onSuccess: (data) => {
      console.log(999,data);
      if (data.success) {
        setNotification({
          message: data.message,
          visible: true,
          bgColor: 'green',
        });
      } else {
        setNotification({
          message: data.message,
          visible: true,
          bgColor: 'red',
        });
      }
    },
  });
  const handleRemove = async (id) => {
    // setLoading(true);
    try {
      const updatedCart = cartData.filter((item) => item.course._id !== id); // Filter out the removed course from the cart
      console.log(43243,updatedCart);
      setCartData(updatedCart);
  
      await mutation.mutateAsync(id); // Call the mutation      
    } catch (error) {
      console.error('Error removing item from cart:', error);
      // setLoading(false);
    }
  };
  
  // useEffect(() => {
  //   console.log("data", data)
  //   setCartData(data?.metadata)
  // }, [data, isSuccessFetch, cartData])

  return (
    <OuterDiv>
      <Notification
        message={notification?.message}
        visible={notification?.visible}
        bgColor={notification?.bgColor}
        onClose={() =>
          setNotification({ message: '', visible: false, bgColor: 'green' })
        }
      />
      <InnerDiv>
        <Title>Shopping Cart</Title>
        {loading ? (
          <div className="container" style={{ textAlign: "center", padding: "20px" }}>
            <PropagateLoader color="var(--color-blue-300)" />
          </div>
        ) : (
          <>
            {cartData?.length > 0 ? (
              <BoxContainer>
                <Box1 style={{ alignItems: "center" }}>
                  <Count> {cartData?.length || 0} courses in Cart</Count>
                  <CourseContainer>
                    {cartData?.map((item) => {
                      const course = item.course;
                      course.instructorName = item.instructor.fullName;
                      // console.log(course);
                      return (
                        <CheckoutCourseCard
                          data={course}
                          extraCss={{ padding: "15px 0" }}
                          onRemove={handleRemove}
                        />
                      );
                    })}
                  </CourseContainer>
                </Box1>
                <Box2>
                  <TotalText>Total:</TotalText>
                  <TotalDiscount>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "USD",
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
                    placeholderTxt="Enter coupon code"
                  />
                  <Link to="/payment/checkout" reloadDocument>
                    <Button
                      width="100%"
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
          </>
        )}
        
      </InnerDiv>
    </OuterDiv>
  );
};

export default ShoppingCart;
