import { SideBarCardWrapper } from "./SideBarCardStyle";
import { Button } from "../../Button/Button";
import useScrollPosition from "../../../hook/useScrollPosition";
import { useState, useEffect } from "react";
const SideBarCard = ({ thumbnailImage, price }) => {
  const scrollPosition = useScrollPosition();
  console.log(scrollPosition);
  const [isFixed, setFixed] = useState(false);

  function checkScroll() {
    if (scrollPosition > 100) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }

  useEffect(() => {
    checkScroll();
  }, [scrollPosition]);
  return (
    <>
      <SideBarCardWrapper isFixed={isFixed}>
        <div className="sidebar-container">
          <div className="course-thumbnail">
            <img src={thumbnailImage} alt="" />
          </div>
          <div className="purchase-section">
            <div className="course-price">${price}</div>

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
              color={"var(--color-black)"}
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
      </SideBarCardWrapper>
    </>
  );
};

export default SideBarCard;
