import { PurchaseSectionWrapper } from "./CourseDetailStyle";
import { Button } from "../../components/Button/Button";
import useScrollPosition from "../../hook/useScrollPosition";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { callApiCreateItemCart } from "../../api/cart";
import { changePriceFormat } from "../../utils/changePriceFormat";
import { useDispatch } from "react-redux";
import Notification from "../../components/Notification/Notification";
import { useNavigate } from "react-router-dom";

const PurchaseSection = ({ id, thumbnailImage, price }) => {
  const navigate = useNavigate();
  const scrollPosition = useScrollPosition();
  const [isFixed, setFixed] = useState(false);
  const [bottomPosition, setBottomPosition] = useState(false);
  const dispatch = useDispatch();
  // console.log(scrollPosition);

  const [notification, setNotification] = useState({
    message: "",
    visible: false,
    bgColor: "green",
  });

  function checkScroll() {
    const bottomLimit =
      document.body.scrollHeight - window.innerHeight - 110 - 32;
    // 510 is the approximate height of the purchase section
    if (scrollPosition > 100 && scrollPosition < bottomLimit) {
      setFixed(true);
      setBottomPosition(false);
    } else {
      if (scrollPosition >= bottomLimit && bottomPosition === false) {
        // Set the top position to keep the section in place
        setBottomPosition(true);
      }
      setFixed(false);
    }
  }

  const mutation = useMutation(callApiCreateItemCart, {
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        setNotification({
          message: data.message,
          visible: true,
          bgColor: "green",
        });
      } else {
        setNotification({
          message: data.message,
          visible: true,
          bgColor: "red",
        });
      }
    },
  });

  async function handleAddToCart() {
    console.log("Course: ", id)
    mutation.mutate(id);
  }

  function handleBuyNow() {
    navigate(`/payment/checkout/${id}`);
    window.location.reload();
  }

  useEffect(() => {
    checkScroll();
  }, [scrollPosition]);
  return (
    <>
      <Notification
        message={notification?.message}
        visible={notification?.visible}
        bgColor={notification?.bgColor}
        onClose={() =>
          setNotification({ message: "", visible: false, bgColor: "green" })
        }
      />
      <PurchaseSectionWrapper isFixed={isFixed} bottomPosition={bottomPosition}>
        <div className="course-thumbnail-container">
          <img src={thumbnailImage} alt="" className="course-thumbnail-img" />
        </div>
        <div className="purchase-section">
          <div className="course-price">${changePriceFormat(price)}</div>

          <Button
            bgColor={"var(--color-purple-300)"}
            fontWeight={"700"}
            fontSize={"16px"}
            width={"100%"}
            className="add-to-cart-btn"
            fontFamily={"var(--font-stack-heading)"}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
          <Button
            bgColor={"var(--color-white)"}
            fontWeight={"700"}
            color={"black"}
            border={"1px solid var(--color-gray-500)"}
            fontSize={"16px"}
            width={"100%"}
            className="buy-now-btn"
            fontFamily={"var(--font-stack-heading)"}
            onClick={handleBuyNow}
          >
            Buy now
          </Button>
          <div className="coupon-section">
            <input
              type="text"
              className="coupon-input"
              placeholder="Enter coupon here"
            />
            <form action="" className="coupon-form">
              <Button
                className="apply-coupon-btn"
                bgColor={"var(--color-gray-600)"}
                fontWeight={"700"}
                fontSize={"13px"}
                width={"100px"}
                color={"white"}
                fontFamily={"var(--font-stack-heading)"}
              >
                Apply
              </Button>
            </form>
          </div>
        </div>
      </PurchaseSectionWrapper>
    </>
  );
};

export default PurchaseSection;
