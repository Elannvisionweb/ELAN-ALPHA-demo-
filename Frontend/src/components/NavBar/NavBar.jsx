import "./NavBar.css";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "/src/assets/logo/white_horizontal_no_bg_cropped_left.png";

function NavBar() {
  const navMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const tl = gsap.timeline();
  const location = useLocation();
  const navigate = useNavigate();

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function onClickLink(e, link) {
    e.preventDefault();
    setMenuOpen(false);
    navigate(link);
  }

  function handleSection(e, path) {
    e.preventDefault();
    if (path && path.includes("#")) {
      setTimeout(() => {
        const id = path.replace("#", "");
        const el = window.document.getElementById(id);
        const r = el.getBoundingClientRect();
        window.top.scroll({
          top: scrollY + r.top,
          behavior: "smooth",
        });
      }, 100);
    }
  }

  useGSAP(() => {
    function something() {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight * 0.3;

      let scrollRatio = scrollPosition / windowHeight;

      scrollRatio = Math.min(Math.max(scrollRatio, 0), 1) * 0.8;

      const colorChangeDiv = document.querySelector(".nav-top");
      colorChangeDiv.style.backgroundColor = `rgba(0, 0, 0, ${scrollRatio})`;
    }

    window.addEventListener("scroll", something);
    return () => {
      window.removeEventListener("scroll", something);
    };
  });

  useGSAP(() => {
    if (menuOpen === true) {
      document.body.style.overflow = "hidden";
      navMenuRef.current.style.zIndex = 50;
      tl.to(navMenuRef.current, {
        opacity: "1",
        duration: 0.3,
      });
      tl.to(
        ".menu-close",
        {
          opacity: 1,
          duration: 0.5,
        },
        "<"
      );
    } else if (menuOpen === false) {
      document.body.style.overflow = "auto";
      tl.to(navMenuRef.current, {
        opacity: "0",
        duration: 0.3,
      });
      tl.to(
        ".menu-close",
        {
          opacity: 0,
          duration: 0.3,
        },
        "<"
      );
      tl.to(
        navMenuRef.current,
        {
          zIndex: "-1",
          duration: 0,
        },
        ">"
      );
    }
  }, [menuOpen]);

  return (
    <div className="nav-cont" id="nav-cont">
      <div className="nav-top">
        <a className="logo" href="/">
          <img src={logo} alt="Elan & nVision" />
        </a>

        <div className="nav-links">
          <div className="mobile-hide">
            <Link to="/events">EVENTS</Link>
          </div>
          <div className="mobile-hide">
            <Link to="/zonals">ZONAL ELIMINATIONS</Link>
          </div>
          {/* <div className='mobile-hide'>
            <Link to='/nexus'>NEXUS</Link>
          </div> */}
          <div className="mobile-hide">
            <Link to="/workshops">WORKSHOPS</Link>
          </div>
          <div className="mobile-hide">
            <Link to="/accommodation">ACCOMMODATION</Link>
          </div>
          <div className="mobile-hide">
            <Link to="/about">ABOUT US</Link>
          </div>
          <div className="menu-open" onClick={toggleMenu}>
            MENU
          </div>
        </div>
      </div>

      <div className="nav-menu" ref={navMenuRef}>
        <div className="menu-close">
          <span className="" onClick={toggleMenu}>
            CLOSE
          </span>
        </div>

        {/* Hamburger Menu starts here */}
        <div className="menu">
          <div
            className={
              "menu-link" +
              (location.pathname === "/" ? " active-menu-link" : "")
            }
          >
            <a href="/" onClick={(e) => onClickLink(e, "/")}>
              Home
            </a>
          </div>
          <div
            className={
              "menu-link" +
              (location.pathname === "/events" ? " active-menu-link" : "")
            }
          >
            <a href="/events" onClick={(e) => onClickLink(e, "/events")}>
              Events
            </a>
          </div>
          <div
            className={
              "menu-link" +
              (location.pathname === "/zonals" ||
              location.pathname === "/zonal-eliminations"
                ? " active-menu-link"
                : "")
            }
          >
            <a href="/zonals" onClick={(e) => onClickLink(e, "/zonals")}>
              Zonal Eliminations
            </a>
          </div>
          <div
            className={
              "menu-link" +
              (location.pathname === "/workshops" ? " active-menu-link" : "")
            }
          >
            <a href="/workshops" onClick={(e) => onClickLink(e, "/workshops")}>
              Workshops
            </a>
          </div>
          <div
            className={
              "menu-link" +
              (location.pathname === "/nexus" ? " active-menu-link" : "")
            }
          >
            <a href="/nexus" onClick={(e) => onClickLink(e, "/nexus")}>
              Nexus
            </a>
          </div>
          <div className={"menu-link"}>
            <a
              href="https://quest.elan.org.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quest Olympiad
            </a>
          </div>
          <div
            className={
              "menu-link" +
              (location.pathname === "/accommodation"
                ? " active-menu-link"
                : "")
            }
          >
            <a
              href="/accommodation"
              onClick={(e) => onClickLink(e, "/accommodation")}
            >
              Accommodation
            </a>
          </div>
          <div
            className={
              "menu-link" +
              (location.pathname === "/about" || location.pathname === "/about-us"
                ? " active-menu-link"
                : "")
            }
          >
            <a href="/about" onClick={(e) => onClickLink(e, "/about")}>
              About Us
            </a>
          </div>
          <div
            className={
              "menu-link" +
              (location.pathname === "/socialcause" ? " active-menu-link" : "")
            }
          >
            <a
              href="/socialcause"
              onClick={(e) => onClickLink(e, "/socialcause")}
            >
              Social Cause
            </a>
          </div>
        </div>
        <div className="social-links">
          <div>
            <a
              href="mailto:elan.nvision@sa.iith.ac.in"
              rel="noopener noreferrer"
              className="mail-link"
            >
              elan.nvision@sa.iith.ac.in
            </a>
          </div>
          <div className="social-social-media-links">
            <a
              className="link-red"
              href="https://www.instagram.com/elan_nvision.iith"
              rel="noopener noreferrer"
              target="_blank"
            >
              Instagram
            </a>
            <span className="mobile-hide">&nbsp;/&nbsp;</span>
            <a
              className="link-green"
              href="https://x.com/elan_nvision"
              rel="noopener noreferrer"
              target="_blank"
            >
              x
            </a>
            <span className="mobile-hide">&nbsp;/&nbsp;</span>
            <a
              className="link-yellow"
              href="https://www.facebook.com/elannvision.iithyderabad/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Facebook
            </a>
            <span className="mobile-hide">&nbsp;/&nbsp;</span>
            <a
              className="link-orange"
              href="https://www.linkedin.com/company/elan-nvision-iith/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Linkedin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
