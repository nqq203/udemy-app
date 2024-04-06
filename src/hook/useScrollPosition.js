import { useState, useEffect } from "react";

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // var documentHeight = Math.max(
      //   document.body.scrollHeight, 
      //   document.documentElement.scrollHeight
      // );
      // var maxScrollY = documentHeight - window.innerHeight;
      // console.log("max Y", maxScrollY);
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
}

export default useScrollPosition;
