import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import CarnivalNav from "./CarnivalNav.jsx";
import Footer from "/src/components/Footer/Footer.jsx";
import curtain from "/src/assets/carnival/curtain.jpg";
import "./carnival.css";
import "./pages.css";

/**
 * ComingSoon
 * Placeholder for pages whose content is not finalised yet. Keeps the route,
 * the navigation and the theme intact so the site stays fully navigable.
 *
 * Props:
 *  - eyebrow (string): small label above the title
 *  - title   (string): page title
 *  - note    (string): one line of context under the title
 */
export default function ComingSoon({ eyebrow, title, note }) {
  return (
    <>
      <Helmet>
        <title>{title} | Elan &amp; nVision, IIT Hyderabad</title>
        <meta
          name="description"
          content={`${title} at Elan & nVision, IIT Hyderabad. Details are being announced soon.`}
        />
      </Helmet>

      <main
        className="cv-page cv-page--soon"
        style={{ "--cv-curtain-img": `url(${curtain})` }}
      >
        <CarnivalNav />

        <div className="cv-soon-wrap">
          <span className="cv-eyebrow">{eyebrow}</span>
          <h1 className="cv-page-title">{title}</h1>

          <div className="cv-rule">
            <span />
            <i>✦</i>
            <span />
          </div>

          <p className="cv-soon-tag">Revealed Soon</p>
          {note && <p className="cv-page-lede cv-soon-note">{note}</p>}

          <Link className="cv-btn cv-soon-btn" to="/">
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
