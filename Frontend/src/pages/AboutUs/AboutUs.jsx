import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import VerticalMarquee from '/src/components/VerticalMarquee/VerticalMarquee.jsx';
import { domainsData } from '/src/data/about_data.js';
import './AboutUs.css';

// Crisp Minimalist Monochrome Social Icons
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

function AboutUs() {
  const [activeDomainId, setActiveDomainId] = useState(domainsData[0].id);

  const activeDomain = domainsData.find((d) => d.id === activeDomainId) || domainsData[0];

  return (
    <>
      <Helmet>
        <title>Elan & nVision | Domains & Leadership</title>
      </Helmet>

      {/* Standard festival vertical marquee */}
      <VerticalMarquee />

      <main className="about-page">
        {/* Header Section matching Competitions & Accommodation */}
        <div className="about-header">
          <h1 className="about-title">Domains & Leadership</h1>
          <div className="about-header-meta">
            <span>{domainsData.length} FEST VERTICALS</span>
          </div>
        </div>

        {/* Split Layout: Domains on left, Heads on right */}
        <div className="about-layout">
          {/* Left Sidebar: Domains Selector */}
          <aside className="about-sidebar">
            <div className="about-sidebar-label">FEST DOMAINS</div>
            <nav className="about-domains-list" aria-label="Fest Domains List">
              {domainsData.map((domain, index) => {
                const isActive = domain.id === activeDomainId;
                const formattedIndex = (index + 1).toString().padStart(2, '0');

                return (
                  <button
                    key={domain.id}
                    className={`domain-tab ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveDomainId(domain.id)}
                  >
                    <span className="domain-tab-index">{formattedIndex}</span>
                    <span className="domain-tab-name">{domain.name}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right Display Panel */}
          <section className="about-content" aria-label="Domain Leadership Details">
            {/* Domain Info */}
            <div className="domain-info-block">
              <div className="domain-info-header">
                <h2 className="domain-title">{activeDomain.name}</h2>
                <span className="domain-heads-badge">
                  {activeDomain.heads.length} {activeDomain.heads.length === 1 ? 'Head' : 'Heads'}
                </span>
              </div>
              {activeDomain.tagline && <p className="domain-tagline">{activeDomain.tagline}</p>}
              {activeDomain.description && <p className="domain-desc">{activeDomain.description}</p>}
            </div>

            {/* Heads Cards Grid */}
            <div className="heads-section">
              <div className="heads-section-title">Domain Heads</div>

              <div className="heads-grid">
                {activeDomain.heads.map((head, idx) => (
                  <div className="head-card" key={idx}>
                    {/* Photo Container - Clean black container ready for future photos */}
                    <div className="head-photo-box">
                      {head.image ? (
                        <img
                          src={head.image}
                          alt={head.name}
                          className="head-photo-img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="head-photo-black">
                          <svg className="head-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                      )}
                      <div className="head-role-pill">{head.role}</div>
                    </div>

                    {/* Head Meta & Info */}
                    <div className="head-meta">
                      <h3 className="head-name">{head.name}</h3>
                      <div className="head-role">{head.role}</div>

                      <div className="head-socials">
                        <a
                          href={head.instagram || "#"}
                          target={head.instagram ? "_blank" : undefined}
                          rel={head.instagram ? "noopener noreferrer" : undefined}
                          className={`head-social-link ${!head.instagram ? "disabled" : ""}`}
                          aria-label={`${head.name} Instagram`}
                          title={head.instagram ? "Instagram Profile" : "Instagram"}
                          onClick={(e) => {
                            if (!head.instagram) e.preventDefault();
                          }}
                        >
                          <InstagramIcon />
                        </a>
                        <a
                          href={head.linkedin || "#"}
                          target={head.linkedin ? "_blank" : undefined}
                          rel={head.linkedin ? "noopener noreferrer" : undefined}
                          className={`head-social-link ${!head.linkedin ? "disabled" : ""}`}
                          aria-label={`${head.name} LinkedIn`}
                          title={head.linkedin ? "LinkedIn Profile" : "LinkedIn"}
                          onClick={(e) => {
                            if (!head.linkedin) e.preventDefault();
                          }}
                        >
                          <LinkedInIcon />
                        </a>
                        <a
                          href={head.email ? `mailto:${head.email}` : "#"}
                          className={`head-social-link ${!head.email ? "disabled" : ""}`}
                          aria-label={`Email ${head.name}`}
                          title={head.email ? `Email: ${head.email}` : "Email"}
                          onClick={(e) => {
                            if (!head.email) e.preventDefault();
                          }}
                        >
                          <MailIcon />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default AboutUs;
