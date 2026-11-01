import "./CustomCursor.css";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      let rotationAngle;
      const deltaX = e.clientX - lastMousePosition.current.x;

      if (cursorRef.current.classList.contains("rotate")) {
        rotationAngle = deltaX * 0.9;
      } else {
        rotationAngle = 0;
      }

      const x =
        e.clientX - cursorRef.current.offsetWidth / 2 - window.innerWidth / 2;
      const y =
        e.clientY - cursorRef.current.offsetHeight / 2 - window.innerHeight / 2;

      gsap.to(cursorRef.current, {
        x: x,
        y: y,
        rotate: rotationAngle,
        duration: 0.2,
      });
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
      lastTime.current = currentTime;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // useEffect(() => {
  //   const cursor = cursorRef.current;

  //   const handleMouseEnter = () => {
  //     gsap.to(cursor, { scale: 10, duration: 0.3 });
  //   };

  //   const handleMouseLeave = () => {
  //     gsap.to(cursor, { scale: 1, duration: 0.3 });
  //   };

  //   // Select the register button and add event listeners
  //   const registerButton = document.querySelector(".register-button");
  //   if (registerButton) {
  //     registerButton.addEventListener("mouseenter", handleMouseEnter);
  //     registerButton.addEventListener("mouseleave", handleMouseLeave);
  //   }

  //   // Clean up event listeners
  //   return () => {
  //     if (registerButton) {
  //       registerButton.removeEventListener("mouseenter", handleMouseEnter);
  //       registerButton.removeEventListener("mouseleave", handleMouseLeave);
  //     }
  //   };
  // }, []);

  return (
    <div className="cursor" id="cursor" ref={cursorRef}>
      <div className="cursor-text" id="cursor-text"></div>
    </div>
  );
};

export default CustomCursor;
