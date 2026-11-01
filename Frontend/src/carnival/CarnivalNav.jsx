import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/src/assets/carnival/carnival-logo.png";
import navEvents from "/src/assets/carnival/nav-events.png";
import navZonals from "/src/assets/carnival/nav-zonals.png";
import navWorkshop from "/src/assets/carnival/nav-workshop.png";
import navMenu from "/src/assets/carnival/nav-menu.png";
import "./CarnivalNav.css";

/**
 * CarnivalNav
 * Top bar matching the Figma landing design: cream logo at left,
 * custom carnival-lettered links plus a MENU drawer at right, over a deep maroon band.
 */
const PRIMARY = [
  { label: "Events", to: "/events", img: navEvents },
  { label: "Zonal Elimination", to: "/zonal-eliminations", img: navZonals },
  { label: "Workshop", to: "/workshops", img: navWorkshop },
];

const MENU = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "Zonal Elimination", to: "/zonal-eliminations" },
  { label: "Workshop", to: "/workshops" },
  { label: "About Us", to: "/about-us" },
];

export default function CarnivalNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const go = (to) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <>
      <header className="cvnav">
        <Link to="/" className="cvnav-logo" aria-label="Elan and nVision home">
          <img src={logo} alt="Elan &amp; nVision, IIT Hyderabad" />
        </Link>

        <nav className="cvnav-links">
          {PRIMARY.map((l) => (
            <Link key={l.to} to={l.to} className="cvnav-link" aria-label={l.label}>
              <img src={l.img} alt={l.label} className="cvnav-img-link" />
            </Link>
          ))}
          <button
            className="cvnav-link cvnav-menu-btn"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-haspopup="true"
            aria-label="Open menu"
          >
            <img src={navMenu} alt="Menu" className="cvnav-img-link cvnav-img-menu" />
          </button>
        </nav>
      </header>

      {open && (
        <div
          className="cvnav-drawer"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div className="cvnav-drawer-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="cvnav-close"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            <ul className="cvnav-drawer-list">
              {MENU.map((l, i) => (
                <li key={l.to} style={{ animationDelay: `${i * 55}ms` }}>
                  <button onClick={() => go(l.to)}>{l.label}</button>
                </li>
              ))}
            </ul>
            <p className="cvnav-drawer-foot">Elan &amp; nVision · IIT Hyderabad</p>
          </div>
        </div>
      )}
    </>
  );
}
