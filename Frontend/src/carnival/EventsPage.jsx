import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import CarnivalNav from "./CarnivalNav.jsx";
import curtain from "/src/assets/carnival/curtain.jpg";
import { tech_competitions } from "/src/data/competition_tech.js";
import { cultural_competitions } from "/src/data/competition_cultural.js";
import "./carnival.css";
import "./pages.css";
import Footer from "/src/components/Footer/Footer.jsx";

const FILTERS = [
  { id: "all", label: "All Events" },
  { id: "tech", label: "Technical" },
  { id: "cultural", label: "Cultural" },
];

export default function EventsPage() {
  const [filter, setFilter] = useState("all");

  const tech = useMemo(
    () => (tech_competitions || []).map((c) => ({ ...c, kind: "tech" })),
    []
  );
  const cultural = useMemo(
    () => (cultural_competitions || []).map((c) => ({ ...c, kind: "cultural" })),
    []
  );

  const shown = useMemo(() => {
    if (filter === "tech") return tech;
    if (filter === "cultural") return cultural;
    return [...tech, ...cultural];
  }, [filter, tech, cultural]);

  return (
    <>
      <Helmet>
        <title>Events | Elan &amp; nVision, IIT Hyderabad</title>
        <meta
          name="description"
          content="Technical and cultural competitions at Elan & nVision, the annual techno-cultural fest of IIT Hyderabad."
        />
      </Helmet>

      <main
        className="cv-page"
        style={{ "--cv-curtain-img": `url(${curtain})` }}
      >
        <CarnivalNav />

        <header className="cv-page-head">
          <span className="cv-eyebrow">Step Right Up</span>
          <h1 className="cv-page-title">Events</h1>
          <p className="cv-page-lede">
            The greatest show on campus runs on competition. From hackathons and
            CTFs to the stage and the spotlight — pick your ring, and make it
            count.
          </p>
          <div className="cv-rule">
            <span />
            <i>✦</i>
            <span />
          </div>
        </header>

        <div className="cv-tabs">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`cv-tab ${filter === f.id ? "is-active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <section className="cv-section">
          <h2 className="cv-section-title">
            {filter === "tech"
              ? "Technical Competitions"
              : filter === "cultural"
              ? "Cultural Competitions"
              : "The Full Line-Up"}
          </h2>

          {shown.length === 0 ? (
            <p className="cv-empty">Line-up being finalised — check back soon.</p>
          ) : (
            <div className="cv-grid">
              {shown.map((c, i) => (
                <article className="cv-ticket cv-tcard" key={`${c.kind}-${i}`}>
                  {c.image && (
                    <img className="cv-poster" src={c.image} alt={c.name} />
                  )}
                  <div className="cv-ticket-inner">
                    <div className="cv-tcard-top">
                      <h3 className="cv-card-title">{c.name}</h3>
                      <span
                        className={`cv-chip ${
                          c.kind === "tech" ? "" : "cv-chip--gold"
                        }`}
                      >
                        {c.kind === "tech" ? "Tech" : "Cultural"}
                      </span>
                    </div>

                    <div className="cv-tcard-body">
                      <p className="cv-card-text">{c.description}</p>
                    </div>

                    <hr className="cv-perf" />

                    <div className="cv-tcard-foot">
                      {c.prizePool && (
                        <div className="cv-stat">
                          <span className="cv-stat-k">Prize Pool</span>
                          <span className="cv-stat-v">{c.prizePool}</span>
                        </div>
                      )}
                      {c.dates && (
                        <div className="cv-stat">
                          <span className="cv-stat-k">Dates</span>
                          <span className="cv-stat-v">{c.dates}</span>
                        </div>
                      )}
                    </div>

                    {c.deadline && (
                      <p className="cv-contacts">
                        <strong>Registration closes:</strong> {c.deadline}
                      </p>
                    )}
                    {c.contact && <p className="cv-contacts">{c.contact}</p>}

                    {c.link && (
                      <p style={{ marginTop: "1.1rem" }}>
                        <a
                          className="cv-btn"
                          href={c.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Register
                        </a>
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
