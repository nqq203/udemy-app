import { SideBarCardWrapper } from "./SideBarCardStyle";
import { Button } from "../Button/Button";
import useScrollPosition from "../../hook/useScrollPosition";
import { useState, useEffect } from "react";
const SideBarCard = ({ video, price }) => {
  const scrollPosition = useScrollPosition();
  console.log(scrollPosition);
  const [isSticky, setSticky] = useState(false);

  function checkScroll() {
    if (scrollPosition > 100) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }

  useEffect(() => {
    checkScroll();
  }, [scrollPosition]);
  return (
    <>
      <SideBarCardWrapper isSticky={isSticky}>
        <ul>
          <li>
            <img src={price} alt="price" />
          </li>

          <li>
            <Button
              bgColor={"var(--color-purple-300)"}
              fontWeight={"700"}
              fontSize={"13px"}
              width={"200px"}
              className="addToCartBtn"
            >
              Add to Cart
            </Button>
          </li>
          <li>
            <Button
              bgColor={"var(--color-white)"}
              fontWeight={"700"}
              color={"var(--color-black)"}
              border={"1px solid var(--color-gray-500)"}
              fontSize={"13px"}
              width={"200px"}
              className="buyNowBtn"
            >
              Buy Now
            </Button>
          </li>
        </ul>
      </SideBarCardWrapper>
    </>
  );
};

export default SideBarCard;
