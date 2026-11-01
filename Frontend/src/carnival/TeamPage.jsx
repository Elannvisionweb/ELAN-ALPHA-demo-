import { Helmet } from "react-helmet";
import CarnivalNav from "./CarnivalNav.jsx";
import curtain from "/src/assets/carnival/curtain.jpg";
import * as team from "/src/data/team.js";
import "./carnival.css";
import "./pages.css";
import Footer from "/src/components/Footer/Footer.jsx";

/* Ordered so the page reads top-down: leadership, then every domain squad. */
const SQUADS = [
  { key: "heads", label: "Domain Heads" },
  { key: "workshop_team", label: "Workshops" },
  { key: "techy_team", label: "Technical" },
  { key: "culti_biggies_team", label: "Culturals & Biggies" },
  { key: "pronites_team", label: "Pronites" },
  { key: "production_team", label: "Production" },
  { key: "sponsorship_team", label: "Sponsorship" },
  { key: "public_relations_team", label: "Public Relations" },
  { key: "publicity_team", label: "Publicity" },
  { key: "web_team", label: "Web" },
  { key: "creatives_team", label: "Creatives" },
  { key: "multimedia_team", label: "Multimedia" },
  { key: "informals_team", label: "Informals" },
  { key: "social_cause_team", label: "Social Cause" },
  { key: "lit_team", label: "Literary" },
  { key: "eml_team", label: "E-Summit & ML" },
  { key: "infrastructure_team", label: "Infrastructure" },
  { key: "security_team", label: "Security" },
  { key: "hospitality_team", label: "Hospitality" },
  { key: "transport_team", label: "Transport" },
  { key: "logistics_team", label: "Logistics" },
];

function Member({ person }) {
  return (
    <div className="cv-member">
      <div className="cv-member-frame">
        {person.image ? (
          <img src={person.image} alt={person.name} loading="lazy" />
        ) : (
          <div
            style={{
              aspectRatio: "1 / 1",
              alignItems: "center",
              background: "#8a6a56",
              color: "#3a1118",
              display: "flex",
              fontFamily: "var(--cv-display)",
              fontSize: "2rem",
              justifyContent: "center",
            }}
          >
            {(person.name || "?").charAt(0)}
          </div>
        )}
      </div>
      <h3 className="cv-member-name">{person.name}</h3>
      {person.position && <p className="cv-member-role">{person.position}</p>}
    </div>
  );
}

export default function TeamPage() {
  const overall = team.overall || [];

  return (
    <>
      <Helmet>
        <title>Team | Elan &amp; nVision, IIT Hyderabad</title>
        <meta
          name="description"
          content="The students behind Elan & nVision, the annual techno-cultural fest of IIT Hyderabad."
        />
      </Helmet>

      <main
        className="cv-page"
        style={{ "--cv-curtain-img": `url(${curtain})` }}
      >
        <CarnivalNav />

        <header className="cv-page-head">
          <span className="cv-eyebrow">Meet The Ringmasters</span>
          <h1 className="cv-page-title">The Team</h1>
          <p className="cv-page-lede">
            Behind every act, every light cue and every stage call is a student
            who signed up to make it happen. This is the crew that runs the
            greatest show at IIT Hyderabad.
          </p>
          <div className="cv-rule">
            <span />
            <i>✦</i>
            <span />
          </div>
        </header>

        {overall.length > 0 && (
          <section className="cv-section">
            <h2 className="cv-section-title">Overall Coordinators</h2>
            <div className="cv-team-grid cv-team-grid--lead">
              {overall.map((p) => (
                <Member key={p.name} person={p} />
              ))}
            </div>
          </section>
        )}

        {SQUADS.map(({ key, label }) => {
          const list = team[key];
          if (!Array.isArray(list) || list.length === 0) return null;
          return (
            <section className="cv-section" key={key}>
              <h2 className="cv-section-title">{label}</h2>
              <div className="cv-team-grid">
                {list.map((p, i) => (
                  <Member key={`${p.name}-${i}`} person={p} />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <Footer />
    </>
  );
}
