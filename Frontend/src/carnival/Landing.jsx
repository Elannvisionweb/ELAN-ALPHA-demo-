import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import CarnivalNav from "./CarnivalNav.jsx";
import curtain from "/src/assets/carnival/curtain.jpg";
import clown from "/src/assets/carnival/clown.png";
import signpost from "/src/assets/carnival/signpost-blank.png";
import wordmark from "/src/assets/carnival/wordmark.png";
import wordmarkDate from "/src/assets/carnival/wordmark-date.png";
import ticketArt from "/src/assets/carnival/ticket-art.jpg";
import Footer from "/src/components/Footer/Footer.jsx";
import "./carnival.css";
import "./Landing.css";

/* Fest opening day — drives the marquee countdown. */
const FEST_START = new Date(2027, 0, 8); // 8 January 2027

const ABOUT_COPY =
  "Elan & nVision is the annual techno-cultural fest of IIT Hyderabad. It is a " +
  "celebration of the stories, the melodies, and the memories that bring us " +
  "together, as well as the technology and innovation that propels us forward. " +
  "Elan & nVision offers to all those who attend, the exciting opportunity to " +
  "witness some of the best aspects of student life, including, but not limited to, " +
  "enthralling competitions, exhilarating performances and electrifying concerts, " +
  "all jam-packed into three days.";

function daysUntil(target) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((target - today) / 86400000));
}

export default function Landing() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [days, setDays] = useState(() => daysUntil(FEST_START));

  useEffect(() => {
    const id = setInterval(() => setDays(daysUntil(FEST_START)), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!aboutOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setAboutOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aboutOpen]);

  return (
    <>
      <Helmet>
        <title>Elan &amp; nVision | IIT Hyderabad</title>
        <meta
          name="description"
          content="Elan & nVision — the annual techno-cultural fest of IIT Hyderabad. January 8, 9 and 10."
        />
      </Helmet>

      <div className="cv-landing">
        <CarnivalNav />

        <section
          className="cv-hero"
          style={{ backgroundImage: `url(${curtain})` }}
        >
          {/* wordmark lifted straight from the artwork, so the lettering is exact */}
          <div className="cv-hero-copy">
            <img className="cv-wordmark" src={wordmark} alt="Elan &amp; nVision" />
            <img
              className="cv-wordmark-date"
              src={wordmarkDate}
              alt="January 8, 9, 10"
            />
          </div>

          <img className="cv-clown" src={clown} alt="" aria-hidden="true" />

          <div className="cv-post">
            <img
              className="cv-post-img"
              src={signpost}
              alt=""
              aria-hidden="true"
            />

            {/* live countdown sits in the blanked digit slot on the board */}
            <span className="cv-days" aria-live="polite" aria-label={`${days} days to go`}>
              {days}
            </span>

            <button
              className="cv-sign cv-sign--about"
              onClick={() => setAboutOpen(true)}
            >
              <span className="cv-sr">About Elan and nVision</span>
              <span className="cv-sign-label" aria-hidden="true">
                About
              </span>
            </button>
            <span className="cv-sign cv-sign--theme cv-sign--locked">
              <span className="cv-sign-soon">Revealed soon</span>
            </span>
            <span className="cv-sign cv-sign--pronite cv-sign--locked">
              <span className="cv-sign-soon">Revealed soon</span>
            </span>
          </div>
        </section>

        <Footer />

        {/* ---------------- About ticket overlay ---------------- */}
        {aboutOpen && (
          <div
            className="cv-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="About Elan and nVision"
            onClick={() => setAboutOpen(false)}
          >
            <div className="cv-ticket-stage" onClick={(e) => e.stopPropagation()}>
              <img
                className="cv-ticket-art"
                src={ticketArt}
                alt=""
                aria-hidden="true"
              />
              <h2 className="cv-ticket-title">About Elan &amp; nVision</h2>
              <p className="cv-ticket-body">{ABOUT_COPY}</p>
              <button
                className="cv-ticket-back"
                onClick={() => setAboutOpen(false)}
              >
                <span className="cv-sr">Back</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
