import { Helmet } from "react-helmet";
import CarnivalNav from "./CarnivalNav.jsx";
import curtain from "/src/assets/carnival/curtain.jpg";
import { domainsData } from "/src/data/about_data.js";
import "./carnival.css";
import "./pages.css";
import Footer from "/src/components/Footer/Footer.jsx";

const FEST_COPY =
  "Elan & nVision is the annual techno-cultural fest of IIT Hyderabad. It is a " +
  "celebration of the stories, the melodies, and the memories that bring us " +
  "together, as well as the technology and innovation that propels us forward. " +
  "Elan & nVision offers to all those who attend, the exciting opportunity to " +
  "witness some of the best aspects of student life, including, but not limited to, " +
  "enthralling competitions, exhilarating performances and electrifying concerts, " +
  "all jam-packed into three days.";

function Head({ person }) {
  const links = [
    person.instagram && { href: person.instagram, label: "Instagram" },
    person.linkedin && { href: person.linkedin, label: "LinkedIn" },
    person.email && { href: `mailto:${person.email}`, label: "Email" },
  ].filter(Boolean);

  return (
    <li className="cv-head">
      <span className="cv-head-avatar" aria-hidden="true">
        {person.image ? (
          <img src={person.image} alt="" loading="lazy" />
        ) : (
          (person.name || "?").charAt(0)
        )}
      </span>
      <span className="cv-head-text">
        <strong className="cv-head-name">{person.name}</strong>
        {person.role && <span className="cv-head-role">{person.role}</span>}
        {links.length > 0 && (
          <span className="cv-head-links">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label}
              </a>
            ))}
          </span>
        )}
      </span>
    </li>
  );
}

export default function AboutUsPage() {
  const domains = domainsData || [];
  const totalHeads = domains.reduce(
    (n, d) => n + (Array.isArray(d.heads) ? d.heads.length : 0),
    0
  );

  return (
    <>
      <Helmet>
        <title>About Us | Elan &amp; nVision, IIT Hyderabad</title>
        <meta
          name="description"
          content="About Elan & nVision — the annual techno-cultural fest of IIT Hyderabad, and the domains that run it."
        />
      </Helmet>

      <main
        className="cv-page"
        style={{ "--cv-curtain-img": `url(${curtain})` }}
      >
        <CarnivalNav />

        <header className="cv-page-head">
          <span className="cv-eyebrow">Elan &amp; nVision · IIT Hyderabad</span>
          <h1 className="cv-page-title">About Us</h1>
          <p className="cv-page-lede">{FEST_COPY}</p>
          <div className="cv-rule">
            <span />
            <i>✦</i>
            <span />
          </div>
        </header>

        <div className="cv-strip">
          <div>
            <div className="cv-strip-k">Edition</div>
            <div className="cv-strip-v">January 8, 9, 10</div>
          </div>
          <div>
            <div className="cv-strip-k">Domains</div>
            <div className="cv-strip-v">{domains.length}</div>
          </div>
          <div>
            <div className="cv-strip-k">Core Heads</div>
            <div className="cv-strip-v">{totalHeads}</div>
          </div>
        </div>

        <section className="cv-section">
          <h2 className="cv-section-title">The Domains</h2>

          {domains.length === 0 ? (
            <p className="cv-empty">Domain details will be published shortly.</p>
          ) : (
            <div className="cv-grid">
              {domains.map((d) => (
                <article className="cv-ticket cv-tcard" key={d.id}>
                  <div className="cv-ticket-inner">
                    <h3 className="cv-card-title">{d.name}</h3>
                    {d.tagline && <p className="cv-card-meta">{d.tagline}</p>}

                    <div className="cv-tcard-body">
                      {d.description && (
                        <p
                          className="cv-card-text"
                          style={{ marginTop: "0.8rem" }}
                        >
                          {d.description}
                        </p>
                      )}
                    </div>

                    {Array.isArray(d.heads) && d.heads.length > 0 && (
                      <>
                        <hr className="cv-perf" />
                        <ul className="cv-head-list">
                          {d.heads.map((p, i) => (
                            <Head key={`${p.name}-${i}`} person={p} />
                          ))}
                        </ul>
                      </>
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
