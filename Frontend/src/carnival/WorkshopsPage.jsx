import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import CarnivalNav from "./CarnivalNav.jsx";
import curtain from "/src/assets/carnival/curtain.jpg";
import { workshopsData } from "/src/data/workshops_data.js";
import "./carnival.css";
import "./pages.css";
import Footer from "/src/components/Footer/Footer.jsx";

export default function WorkshopsPage() {
  const workshops = workshopsData || [];

  return (
    <>
      <Helmet>
        <title>Workshops | Elan &amp; nVision, IIT Hyderabad</title>
        <meta
          name="description"
          content="Hands-on workshops at Elan & nVision, IIT Hyderabad — learn directly from researchers and industry mentors."
        />
      </Helmet>

      <main
        className="cv-page"
        style={{ "--cv-curtain-img": `url(${curtain})` }}
      >
        <CarnivalNav />

        <header className="cv-page-head">
          <span className="cv-eyebrow">Behind The Curtain</span>
          <h1 className="cv-page-title">Workshops</h1>
          <p className="cv-page-lede">
            Hands-on experiential learning at IIT Hyderabad — from foundational
            Machine Learning and AI to high-performance aeronautical design and
            simulation.
          </p>
          <div className="cv-rule">
            <span />
            <i>✦</i>
            <span />
          </div>
        </header>

        <section className="cv-section cv-workshop-intro">
          <div className="cv-workshop-copy">
            <span className="cv-kicker">Learn Behind The Curtain</span>
            <h2 className="cv-section-title">Build, Test, Take Flight</h2>
            <p>
              Workshops at Elan &amp; ηVision are engineered for intensive,
              hands-on learning in frontier domains — from foundational Machine
              Learning and AI to high-performance aeronautical design and
              simulation. Designed and led in collaboration with industry
              pioneers and IIT Hyderabad scholars, each session combines core
              theory with direct experiential execution.
            </p>
            <p>
              Beyond the technical curriculum, take advantage of networking
              opportunities, student catch-up sessions, and friendly games
              during breaks. Planning to attend from out of town? We provide
              affordable on-campus hostel accommodation and economical city
              shuttle transport to make your stay effortless.
            </p>
          </div>
          <aside className="cv-workshop-stay">
            <span className="cv-kicker">Campus Stay &amp; Transit</span>
            <h3>Planning Your Visit?</h3>
            <p>
              Stay overnight on campus and experience life at IIT Hyderabad.
              In-campus accommodation and designated city shuttles are
              available at student-friendly rates.
            </p>
            <Link to="/accommodation" className="cv-btn cv-btn--ghost">
              Get Accommodation ↗
            </Link>
          </aside>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">On The Bill</h2>
          <p className="cv-workshop-badge">2 Active Tracks · Oct 31 – Nov 1</p>

          {workshops.length === 0 ? (
            <p className="cv-empty">
              Workshop line-up being finalised — check back soon.
            </p>
          ) : (
            <div className="cv-grid">
              {workshops.map((w) => (
                <article className="cv-ticket cv-tcard" key={w.id}>
                  {w.poster && (
                    <img
                      className="cv-poster"
                      src={w.poster}
                      alt={w.alt || w.title}
                    />
                  )}
                  <div className="cv-ticket-inner">
                    <div className="cv-tcard-top">
                      <h3 className="cv-card-title">{w.title}</h3>
                      {w.domain && (
                        <span className="cv-chip cv-chip--gold">{w.domain}</span>
                      )}
                    </div>

                    {w.subtitle && (
                      <p className="cv-card-meta">{w.subtitle}</p>
                    )}

                    <div className="cv-tcard-body">
                      <p className="cv-card-text" style={{ marginTop: "0.8rem" }}>
                        {w.description}
                      </p>

                      {Array.isArray(w.highlights) && w.highlights.length > 0 && (
                        <ul className="cv-bullets">
                          {w.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <hr className="cv-perf" />

                    <div className="cv-tcard-foot">
                      {w.dates && (
                        <div className="cv-stat">
                          <span className="cv-stat-k">Dates</span>
                          <span className="cv-stat-v">{w.dates}</span>
                        </div>
                      )}
                      {w.venue && (
                        <div className="cv-stat">
                          <span className="cv-stat-k">Venue</span>
                          <span className="cv-stat-v">{w.venue}</span>
                        </div>
                      )}
                    </div>

                    {Array.isArray(w.coordinators) && w.coordinators.length > 0 && (
                      <p className="cv-contacts">
                        <strong>Coordinators:</strong>{" "}
                        {w.coordinators.map((c, i) => (
                          <span key={c.name}>
                            {i > 0 && " · "}
                            {c.name}{" "}
                            <a href={`tel:${c.tel || c.phone}`}>{c.phone}</a>
                          </span>
                        ))}
                      </p>
                    )}

                    {w.unstopUrl && (
                      <p style={{ marginTop: "1.1rem" }}>
                        <a
                          className="cv-btn"
                          href={w.unstopUrl}
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
