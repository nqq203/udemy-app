import { PurchaseSectionWrapper } from "./CourseDetailStyle";
import { Button } from "../../components/Button/Button";
import useScrollPosition from "../../hook/useScrollPosition";
import { useState, useEffect } from "react";
import { changePriceFormat } from "../../utils/changePriceFormat";
const PurchaseSection = ({ thumbnailImage, price, footerRef }) => {
  const scrollPosition = useScrollPosition();
  const [isFixed, setFixed] = useState(false);
  const [topPosition, setTopPosition] = useState(false);
  console.log(scrollPosition);

  function checkScroll() {
    if (footerRef.current) {
      const footerRect = footerRef.current.getBoundingClientRect();
      const footerTop = footerRect.top + window.scrollY;
      // 510 is the approximate height of the purchase section
      if (scrollPosition > 100 && scrollPosition < footerTop - 538) {
        setFixed(true);
        setTopPosition(null);
      } else {
        if (
          window.scrollY + window.innerHeight >= footerTop &&
          topPosition === null
        ) {
          // Set the top position to keep the section in place
          setTopPosition(true);
        }
        setFixed(false);
      }
    }
  }

  useEffect(() => {
    checkScroll();
  }, [scrollPosition]);
  return (
    <>
      <PurchaseSectionWrapper isFixed={isFixed} topPosition={topPosition}>
        <div className="sidebar-container">
          <div className="course-thumbnail-container">
            <img src={thumbnailImage} alt="" className="course-thumbnail-img" />
          </div>
          <div className="purchase-section">
            <div className="course-price">{changePriceFormat(price)}đ</div>

            <Button
              bgColor={"var(--color-purple-300)"}
              fontWeight={"700"}
              fontSize={"16px"}
              width={"100%"}
              className="add-to-cart-btn"
              fontFamily={"var(--font-stack-heading)"}
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
        </div>
      </PurchaseSectionWrapper>
    </>
  );
};

export default PurchaseSection;
