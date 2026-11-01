import "./Home.css";
import VerticalMarquee from "/src/components/VerticalMarquee/VerticalMarquee.jsx";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import Marquee from "react-fast-marquee";
import { Link, useNavigate } from "react-router-dom";

import Banna from "/src/assets/sponsors_images/Banna.png";
import Blend360 from "/src/assets/sponsors_images/Blend360.png";
import CocaCola from "/src/assets/sponsors_images/Coca Cola.png";
import EMT from "/src/assets/sponsors_images/EMT.png";
import ForgeAlumnus from "/src/assets/sponsors_images/Forge Alumnus.png";
import Gaana from "/src/assets/sponsors_images/Gaana.png";
import Godrej from "/src/assets/sponsors_images/Godrej.png";
import Greenko from "/src/assets/sponsors_images/Greenko.png";
import Hitachi from "/src/assets/sponsors_images/Hitachi.png";
import HoneyTwigs from "/src/assets/sponsors_images/Honey Twigs.png";
import IBM from "/src/assets/sponsors_images/IBM.png";
import IndianOil from "/src/assets/sponsors_images/Indian Oil.png";
import jio from "/src/assets/sponsors_images/jio.png";
import KLA from "/src/assets/sponsors_images/KLA.png";
import KTM from "/src/assets/sponsors_images/KTM.png";
import LT from "/src/assets/sponsors_images/L&T.png";
import Maybelline from "/src/assets/sponsors_images/Maybelline.png";
import Microsoft from "/src/assets/sponsors_images/Microsoft.png";
import MTV from "/src/assets/sponsors_images/MTV.png";
import ola from "/src/assets/sponsors_images/ola.png";
import Realme from "/src/assets/sponsors_images/Realme.png";
import Safexpress from "/src/assets/sponsors_images/Safexpress.png";
import Stockedge from "/src/assets/sponsors_images/Stockedge.png";
import Tinder from "/src/assets/sponsors_images/Tinder.png";
import Uniball from "/src/assets/sponsors_images/Uniball.png";
import { Helmet } from "react-helmet";

function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const elanRef = useRef(null);
  const nvisionRef = useRef(null);
  const [currentTime, setCurrentTime] = useState("");
  const sponsorMarqueeRef = useRef(null);

  useEffect(() => {
    function setTime() {
      const ISTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
      const now = new Date(ISTime);
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const isAm = hours < 12;
      hours = hours % 12 || 12;
      const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(
        seconds
      )} ${isAm ? "A.M" : "P.M"} IST`;
      setCurrentTime(formattedTime);
    }

    setTime();
    const interval = setInterval(setTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const padZero = (number) => {
    return number < 10 ? "0" + number : number;
  };

  function handleWorkshop(e, link) {
    e.preventDefault();
    navigate(link);
  }

  useGSAP(() => {
    if (window.innerWidth > 992) {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: ".home-bg",
          scroller: "body",
          start: "top top",
          end: "100% 20%",
          scrub: true,
          markers: false,
        },
        backgroundColor: "rgba(0,0,0,1)",
        duration: 1,
      });
    }
  }, []);

  useGSAP(() => {
    gsap.to(elanRef.current, {
      left: "6vw",
      duration: 4,
      scrollTrigger: {
        trigger: elanRef.current,
        scroller: "body",
        markers: false,
        start: "top 48%",
        end: "bottom -20%",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Elan&nVision | Home</title>
      </Helmet>

      <VerticalMarquee />
      <div className="home-bg"></div>
      <div className="container" ref={containerRef}>
        <div className="hero mobile-hide">
          <div className="hero-text">
            <span ref={elanRef} className="elan-text">
              Elan &<br />
            </span>
            <span ref={nvisionRef}>
              nVision
            </span>
          </div>
          <div className="hero-sub-text">
            <div className="mobile-hide">{currentTime}</div>
            <div>IIT HYDERABAD</div>
          </div>
        </div>

        <div className="hero desktop-hide">
          <div className="hero-text">
            <span className="elan-text">
              Elan &
              <br />
            </span>
            <span>
              nVision
            </span>
          </div>
          <div className="hero-sub-text">
            <div className="mobile-hide">{currentTime}</div>
            <div>IIT HYDERABAD</div>
          </div>
          <div className="about-mobile">
            <br />
            <br />
            <br />
            <p className="about-mobile-text">
              Elan & nVision is the annual techno-cultural fest of IIT
              Hyderabad. It is a celebration of the stories, the melodies, and
              the memories that bring us together, as well as the technology and
              innovation that propels us forward. Elan & nVision offers to all
              those who attend, the exciting opportunity to witness some of the
              best aspects of student life, including, but not limited to,
              enthralling competitions, exhilarating performances and
              electrifying concerts, all jam-packed into three days.
            </p>
          </div>
        </div>

        <div className="about mobile-hide">
          <div className="about-text" id="about-text">
            <p className="about-text-para">
              Elan & nVision is the annual techno-cultural fest of IIT
              Hyderabad. It is a celebration of the stories, the melodies, and
              the memories that bring us together, as well as the technology and
              innovation that propels us forward. Elan & nVision offers to all
              those who attend, the exciting opportunity to witness some of the
              best aspects of student life, including, but not limited to,
              enthralling competitions, exhilarating performances and
              electrifying concerts, all jam-packed into three days.
            </p>
          </div>
        </div>

        {/*
        TODO: complete gallery layout for desktop and mobile,
              add gallery title for mobile (and desktop?)
        */}
        <div className="gallery-cont">
          <div className="gallery-title">Gallery</div>
          <div className="gallery">
            <div className="gallery-item gallery-1"></div>
            <div className="gallery-item gallery-2"></div>
            <div className="gallery-item gallery-3"></div>
            <div className="gallery-item gallery-4"></div>
            <div className="gallery-item gallery-5"></div>
            <div className="gallery-item gallery-6"></div>
            <div className="gallery-item gallery-7"></div>
            <div className="gallery-item gallery-8"></div>
            <div className="gallery-item gallery-9"></div>
            <div className="gallery-item gallery-10"></div>
            <div className="gallery-item gallery-11"></div>
            <div className="gallery-item gallery-12"></div>
            <div className="gallery-item gallery-13"></div>
            <div className="gallery-item gallery-14"></div>
            <div className="gallery-item gallery-15"></div>
            <div className="gallery-item gallery-16"></div>
            <div className="gallery-item gallery-17"></div>
            <div className="gallery-item gallery-18"></div>
            <div className="gallery-item gallery-19"></div>
            <div className="gallery-item gallery-20"></div>
            <div className="gallery-item gallery-21"></div>
            <div className="gallery-item gallery-22"></div>
            <div className="gallery-item gallery-23"></div>
            <div className="gallery-item gallery-24"></div>
          </div>
        </div>
      </div>

      <div className="sponsors-cont">
        <div className="sponsor-title">Our partners</div>

        <div className="marquee">
          <Marquee
            autoFill
            speed={150}
            ref={sponsorMarqueeRef}
            direction={"right"}
          >
            <div className="marquee-inner">
              <div className="sponsors-box">
                <img src={Banna} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={Blend360} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={CocaCola} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={EMT} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={ForgeAlumnus} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={Gaana} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={Godrej} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={Greenko} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={Hitachi} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={HoneyTwigs} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={IBM} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={IndianOil} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={jio} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={KLA} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={KTM} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={LT} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={Maybelline} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={Microsoft} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={MTV} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={ola} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={Realme} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={Safexpress} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={Stockedge} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={Tinder} alt="" />
              </div>
              <div className="sponsors-box">
                <img src={Uniball} alt="" />
              </div>
            </div>
          </Marquee>
        </div>
      </div>
    </>
  );
}

export default Home;
