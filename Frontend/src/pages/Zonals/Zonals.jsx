import React, { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useLenis } from "lenis/react";
import VerticalMarquee from "/src/components/VerticalMarquee/VerticalMarquee.jsx";
import {
  zonalsMeta,
  zonalRegions,
  pastArtists,
  generalContacts,
} from "/src/data/zonals_data.js";
import "./Zonals.css";

// SVG Icons matching the website's minimalist aesthetic
const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const QrIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="5" height="5" x="3" y="3" rx="1"/>
    <rect width="5" height="5" x="16" y="3" rx="1"/>
    <rect width="5" height="5" x="3" y="16" rx="1"/>
    <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
    <path d="M21 21v.01"/>
    <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
    <path d="M3 12h.01"/>
    <path d="M12 3h.01"/>
    <path d="M12 16v.01"/>
    <path d="M16 12h1"/>
    <path d="M21 12v.01"/>
    <path d="M12 21v-1"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

function Zonals() {
  const [isReady, setIsReady] = useState(false);
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  // Active region data accessor (North Zonal only)
  const currentRegion = zonalRegions.north;
  const currentEvents = currentRegion.events;

  // Statistics count-up state
  const [statsValues, setStatsValues] = useState({
    attendees: "50,000+",
    participants: "12,500+",
    competitions: "30+",
    reach: "1.2M+",
    partners: "15+",
  });
  const statsRef = useRef(null);
  const countUpTriggered = useRef(false);

  // ── Animation A: Hero readiness on mount ──────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 40);
    return () => clearTimeout(timer);
  }, []);

  // ── Animation B & H: IntersectionObserver for Section Reveals ─────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const revealElements = document.querySelectorAll(".zonals-page .zonal-reveal");
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  // ── Scroll-controlled competition wheel ──────────────────────────────────
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const scrollContainerRef = useRef(null);
  const stickyRef = useRef(null);
  const wheelRef = useRef(null);

  const updateWheelFromScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const rect = container.getBoundingClientRect();
    const stickyH = sticky.offsetHeight;
    const totalScrollable = container.offsetHeight - stickyH;
    if (totalScrollable <= 0) return;

    const scrolled = Math.min(totalScrollable, Math.max(0, -rect.top));
    const progress = scrolled / totalScrollable;
    const count = currentEvents.length;
    const degreesPerEvent = 360 / count;
    const rotation = progress * degreesPerEvent * (count - 1);
    const next = Math.min(count - 1, Math.max(0, Math.round(progress * (count - 1))));

    if (wheelRef.current) {
      wheelRef.current.style.setProperty("--wheel-rotation", `${rotation}deg`);
      wheelRef.current.style.setProperty("--wheel-counter-rotation", `${-rotation}deg`);
    }

    if (next !== activeIndexRef.current) {
      activeIndexRef.current = next;
      setActiveIndex(next);
    }
  }, [currentEvents.length]);

  const lenis = useLenis(() => {
    updateWheelFromScroll();
  });

  useEffect(() => {
    let animationFrame = null;
    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(() => {
        updateWheelFromScroll();
        animationFrame = null;
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [updateWheelFromScroll]);

  const scrollToEvent = (index) => {
    const container = scrollContainerRef.current;
    const sticky = stickyRef.current;
    if (container && sticky) {
      const rect = container.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const totalScrollable = container.offsetHeight - sticky.offsetHeight;
      if (totalScrollable <= 0) {
        activeIndexRef.current = index;
        setActiveIndex(index);
        return;
      }
      const targetY = containerTop + (index / (currentEvents.length - 1)) * totalScrollable;
      if (lenis) {
        lenis.scrollTo(targetY, { duration: 0.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    } else {
      activeIndexRef.current = index;
      setActiveIndex(index);
    }
  };

  // ── Animation G: Statistics Count-Up ──────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const element = statsRef.current;
    if (!element) return;

    setStatsValues({
      attendees: "0+",
      participants: "0+",
      competitions: "0+",
      reach: "0.0M+",
      partners: "0+",
    });

    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countUpTriggered.current) {
          countUpTriggered.current = true;
          statsObserver.unobserve(element);

          const duration = 1200;
          const startTime = performance.now();

          const animateCount = (now) => {
            const elapsed = now - startTime;
            const rawProgress = Math.min(1, elapsed / duration);
            const progress = rawProgress === 1 ? 1 : 1 - Math.pow(2, -10 * rawProgress);

            const attendeesVal = Math.floor(progress * 50000).toLocaleString();
            const participantsVal = Math.floor(progress * 12500).toLocaleString();
            const competitionsVal = Math.floor(progress * 30);
            const reachVal = (progress * 1.2).toFixed(1);
            const partnersVal = Math.floor(progress * 15);

            setStatsValues({
              attendees: `${attendeesVal}+`,
              participants: `${participantsVal}+`,
              competitions: `${competitionsVal}+`,
              reach: `${reachVal}M+`,
              partners: `${partnersVal}+`,
            });

            if (rawProgress < 1) {
              requestAnimationFrame(animateCount);
            } else {
              setStatsValues({
                attendees: "50,000+",
                participants: "12,500+",
                competitions: "30+",
                reach: "1.2M+",
                partners: "15+",
              });
            }
          };

          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.2 }
    );

    statsObserver.observe(element);
    return () => statsObserver.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Elan & nVision | ${currentRegion.name} Eliminations`}</title>
        <meta
          name="description"
          content={`${currentRegion.name} Eliminations for Elan & nVision IIT Hyderabad. Win prize worth ₹2,00,000 and earn a chance to perform live at the Grand Finale.`}
        />
      </Helmet>

      {/* Standard festival vertical marquee */}
      <VerticalMarquee />

      <main className={`zonals-page ${isReady ? "is-ready" : ""}`}>
        {/* ================= HEADER SECTION (Animation A) ================= */}
        <header className="zonals-header">
          <div className="zonal-hero__top-row">
            <span className="zonal-hero__eyebrow section-pill-tag">
              IIT HYDERABAD PRESENTS • ELAN & nVISION 2027
            </span>
          </div>

          {/* Region Identity Banner with Applications Open badge */}
          <div className="zonal-region-nav-wrap">
            <div className="zonal-region-banner">
              <div className="region-banner-badge">
                <span className="pulse-indicator" />
                <span>NORTH ZONE</span>
                <span className="region-date-pill" style={{ marginLeft: '0.75rem' }}>1 NOV</span>
                <span className="region-status-badge" style={{ marginLeft: '0.5rem' }}>APPLICATIONS OPEN</span>
              </div>
              <div className="region-banner-text">
                <strong>Applications Sourced From:</strong> {currentRegion.coveredStates}
              </div>
            </div>
          </div>

          <div className="zonal-hero__main-row">
            <div className="zonal-title-mask zonal-hero__title-mask">
              <h1 className="zonals-title zonal-title-reveal">
                {currentRegion.name} Eliminations
              </h1>
            </div>
            <div className="zonals-header-meta">
              <span className="zonals-meta-date">1 NOV</span>
              <span className="zonals-meta-sep">•</span>
              <div className="zonals-meta-prize-badge">
                <span className="prize-badge-label">PRIZE POOL</span>
                <span className="prize-badge-val">₹2,00,000</span>
              </div>
            </div>
          </div>
          <div className="zonal-hero__divider" />
        </header>

        {/* ================= PROMINENT PRIZE POOL HERO BANNER ================= */}
        <div className="zonal-prize-hero-banner zonal-reveal">
          <div className="prize-hero-left">
            <span className="prize-hero-eyebrow">GRAND ZONAL REWARDS</span>
            <div className="prize-hero-amount-wrap">
              <span className="prize-hero-currency">₹</span>
              <span className="prize-hero-amount">2,00,000</span>
              <span className="prize-hero-label">PRIZE POOL</span>
            </div>
            <p className="prize-hero-sub">Cash Awards & Direct Qualification for Grand Finale at IIT Hyderabad</p>
          </div>
          <div className="prize-hero-perks">
            <div className="prize-perk-pill">
              <span className="prize-perk-star">✦</span>
              <span>5 Flagship Competitions</span>
            </div>
            <div className="prize-perk-pill">
              <span className="prize-perk-star">✦</span>
              <span>Eliminations Date: 1st November</span>
            </div>
            <div className="prize-perk-pill">
              <span className="prize-perk-star">✦</span>
              <span>Live Stage at Grand Finale</span>
            </div>
          </div>
        </div>

        {/* ================= EDITORIAL OVERVIEW (Animation B) ================= */}
        <section className="zonals-overview-section zonal-reveal" aria-label="About Zonal Eliminations">
          <div className="zonals-intro-block zonal-reveal zonal-reveal--delay-1">
            <p className="zonals-lead-statement">
              {currentRegion.applicationNotice}
            </p>
            <div className="zonals-format-strip">
              <span className="format-tag">COMPETITION FORMAT & ADVANCEMENT</span>
              <p className="format-text">
                This is the first round of competition. Top-performing teams and soloists selected from the{" "}
                <strong>{currentRegion.name}</strong> will receive direct berths to perform live at the Grand
                Finale, held during Elan & nVision at IIT Hyderabad.
              </p>
            </div>
          </div>

          <div className="zonals-specs-column zonal-reveal zonal-reveal--delay-2">
            <div className="spec-row">
              <span className="spec-label">ACTIVE ZONE</span>
              <span className="spec-val highlight-region">{currentRegion.name} ({currentRegion.hub})</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">ELIMINATIONS DATE</span>
              <span className="spec-val highlight-date">{currentRegion.date}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">APPLICATIONS SOURCED FROM</span>
              <span className="spec-val covered-states-val">{currentRegion.coveredStates}</span>
            </div>
            <div className="spec-row spec-row--prize-highlight">
              <span className="spec-label">TOTAL PRIZE POOL</span>
              <span className="spec-val highlight-prize-prominent">{zonalsMeta.totalPrize}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">GRAND FINALE</span>
              <span className="spec-val">{zonalsMeta.grandFinale}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">PARTICIPANT PERKS</span>
              <span className="spec-val">
                Grand Stage Opportunity, Certificates, Concert Access & Official Goodies
              </span>
            </div>
          </div>
        </section>

        {/* ================= STATS STRIP (Animation G Count-Up) ================= */}
        <section
          ref={statsRef}
          className="zonals-stats-strip zonal-reveal"
          aria-label="Festival Metrics"
        >
          <div className="stat-unit zonal-reveal zonal-reveal--delay-1">
            <span className="stat-num">{statsValues.attendees}</span>
            <span className="stat-sub">Attendees</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-unit zonal-reveal zonal-reveal--delay-2">
            <span className="stat-num">{statsValues.participants}</span>
            <span className="stat-sub">Participants</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-unit zonal-reveal zonal-reveal--delay-3">
            <span className="stat-num">{statsValues.competitions}</span>
            <span className="stat-sub">Competitions</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-unit zonal-reveal zonal-reveal--delay-4">
            <span className="stat-num">{statsValues.reach}</span>
            <span className="stat-sub">Social Reach</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-unit zonal-reveal zonal-reveal--delay-5">
            <span className="stat-num">{statsValues.partners}</span>
            <span className="stat-sub">Media Partners</span>
          </div>
        </section>

        {/* ================= FESTIVAL CONTEXT NOTE ================= */}
        <div className="fest-context-note zonal-reveal">
          <p>
            Elan & nVision is the annual techno-cultural fest of IIT Hyderabad. The North Zonal
            Eliminations ensure nationwide access, giving talented performers a dedicated regional
            stage and fair evaluation before the IIT Hyderabad Grand Finale.
          </p>
        </div>

        {/* ================= EVENTS AT A GLANCE & FILTER (Animation E Motif) ================= */}
        <section className="zonals-events-section" id="events" aria-label="Zonal Competitions">
          <div className="events-section-header zonal-reveal">
            <div className="events-header-left">
              <div className="events-header-titles">
                <div className="section-pill-tag">{currentRegion.shortName.toUpperCase()} FLAGSHIP COMPETITIONS</div>
                <div className="zonal-title-mask">
                  <h2 className="section-title zonal-title-reveal">Events at a Glance</h2>
                </div>
              </div>
              <div className="zonal-orbit" aria-hidden="true" title="Festival Identity Motif">
                <div className="zonal-orbit__ring" />
                <div className="zonal-orbit__marker" />
                <div className="zonal-orbit__inner-ring" />
              </div>
            </div>

            {/* Filter Pills */}
            <nav className="events-filter-bar" aria-label="Event Filter">
              {currentEvents.map((ev, idx) => (
                <button
                  key={ev.id}
                  className={`filter-tab ${activeIndex === idx ? "active" : ""}`}
                  onClick={() => scrollToEvent(idx)}
                >
                  {ev.name}
                </button>
              ))}
            </nav>
          </div>

          {/* ================= SCROLL-CONTROLLED COMPETITION WHEEL ================= */}
          <div className="zonal-scroll" ref={scrollContainerRef}>
            <div className="zonal-scroll__sticky" ref={stickyRef}>
              <div className="zonal-scroll__background" aria-hidden="true">
                {currentEvents.map((event, index) => (
                  <div
                    key={`north-${event.id}`}
                    className={`zonal-scroll__background-image ${activeIndex === index ? "is-active" : ""}`}
                  >
                    <img src={event.image} alt="" loading={index === 0 ? "eager" : "lazy"} />
                  </div>
                ))}
              </div>

              {/* LEFT: Event details stay in lockstep with the fixed selector. */}
              <div className="zonal-scroll__details">
                {currentEvents.map((event, index) => (
                  <article
                    key={`north-${event.id}`}
                    className={`zonal-scroll__detail ${activeIndex === index ? "is-active" : ""}`}
                    aria-hidden={activeIndex !== index}
                    inert={activeIndex !== index ? "" : undefined}
                  >
                    <div className="event-top-meta">
                      <span className="event-order">0{index + 1}</span>
                      <span className="event-date-chip">1 NOV</span>
                      <span className="event-badge">{event.category}</span>
                    </div>

                    <h2 className="event-title">{event.name}</h2>

                    <p className="event-desc">{event.description}</p>

                    <div className="event-prize-box">
                      <div className="prize-label">PRIZE POOL</div>
                      <div className="prize-amount">{event.prizePool}</div>
                    </div>

                    {/* Details Grid */}
                    <div className="event-meta-list">
                      <div className="event-meta-row">
                        <span className="meta-row-label">
                          <PhoneIcon /> COORDINATOR:
                        </span>
                        <span className="meta-row-val">
                          {event.contact.name} (
                          <a href={`tel:${event.contact.tel}`} className="contact-tel-link">
                            {event.contact.phone}
                          </a>
                          )
                        </span>
                      </div>
                    </div>

                    {/* Actions: Registration links on Zonals are shown */}
                    <div className="event-actions-row">
                      <a
                        href={event.unstopUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="unstop-register-btn"
                        title={`Register for ${event.name} (${currentRegion.name}) on Unstop`}
                      >
                        <span>Register on Unstop</span>
                        <ExternalLinkIcon />
                      </a>
                      <button
                        type="button"
                        className="qr-register-btn event-qr-button"
                        onClick={() => setActiveModalEvent(event)}
                      >
                        <QrIcon />
                        <span>Registration QR</span>
                      </button>
                      <a href={`tel:${event.contact.tel}`} className="contact-call-btn">
                        <PhoneIcon />
                        <span>Contact Lead</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              {/* RIGHT: A physical-style wheel. Its transform is driven only by scroll progress. */}
              <div className="zonal-scroll__wheel-stage">
                <div className="wheel-stage__eyebrow" aria-hidden="true">SCROLL TO SELECT</div>
                <div className="wheel-stage__assembly">
                  <div className="wheel-stage__indicator" aria-hidden="true">
                    <span />
                    <small>ACTIVE</small>
                  </div>
                  <div
                    className="zonal-scroll__wheel"
                    ref={wheelRef}
                    style={{ "--wheel-rotation": "0deg", "--wheel-counter-rotation": "0deg" }}
                    aria-label={`Competition wheel. ${currentEvents[activeIndex]?.name || ""} is selected.`}
                  >
                    <div className="wheel-ring wheel-ring--outer" aria-hidden="true" />
                    <div className="wheel-ring wheel-ring--inner" aria-hidden="true" />
                    <div className="wheel-spokes" aria-hidden="true">
                      {currentEvents.map((event, index) => (
                        <span
                          key={`spoke-${event.id}`}
                          style={{ "--spoke-angle": `${index * -72}deg` }}
                        />
                      ))}
                    </div>

                    {currentEvents.map((event, index) => (
                      <div
                        key={`wheel-${event.id}`}
                        className={`wheel-event ${activeIndex === index ? "is-active" : ""}`}
                        style={{
                          "--event-angle": `${180 - index * 72}deg`,
                          "--event-counter-angle": `${-180 + index * 72}deg`,
                        }}
                      >
                        <button
                          type="button"
                          className="wheel-event__card"
                          onClick={() => scrollToEvent(index)}
                          aria-pressed={activeIndex === index}
                          aria-label={`Select ${event.name}`}
                        >
                          <span className="wheel-event__image-wrap">
                            <img
                              src={event.image}
                              alt=""
                              loading={index < 2 ? "eager" : "lazy"}
                            />
                          </span>
                          <span className="wheel-event__copy">
                            <span className="wheel-event__number">0{index + 1}</span>
                            <span className="wheel-event__name">{event.name}</span>
                          </span>
                        </button>
                      </div>
                    ))}

                    <div className="wheel-hub" aria-hidden="true">
                      <span className="wheel-hub__index">0{activeIndex + 1}</span>
                      <span className="wheel-hub__label">OF 0{currentEvents.length}</span>
                    </div>
                  </div>
                </div>

                <div className="wheel-stage__progress" aria-hidden="true">
                  <span>01</span>
                  <div>
                    <i style={{ transform: `scaleX(${(activeIndex + 1) / currentEvents.length})` }} />
                  </div>
                  <span>05</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= PAST ARTISTS (Animation H) ================= */}
        <section className="zonals-artists-section zonal-reveal" aria-label="Artists who graced our stage">
          <div className="artists-header">
            <div className="section-pill-tag">STAGE LEGACY</div>
            <div className="zonal-title-mask">
              <h2 className="section-title zonal-title-reveal">Artists Who Have Graced Our Stage</h2>
            </div>
            <p className="artists-intro">
              Our fest has played host to some of the biggest names in music and comedy over the
              years. Past editions have featured renowned headliners alongside acclaimed acts.
            </p>
          </div>
          <div className="zonal-section-divider" />
          <div className="artists-tag-cloud">
            {pastArtists.map((artist, idx) => (
              <div
                className="artist-tag zonal-reveal"
                key={idx}
                style={{ "--tag-index": idx }}
              >
                <span className="artist-star">✦</span>
                <span className="artist-name">{artist}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CONTACTS & HELP DESK (Animation H) ================= */}
        <section className="zonals-contact-section zonal-reveal" id="contacts" aria-label="Event Inquiries">
          <div className="contact-card">
            <div className="contact-card-header">
              <div className="section-pill-tag">{currentRegion.shortName.toUpperCase()} SUPPORT TEAM</div>
              <div className="zonal-title-mask">
                <h2 className="section-title zonal-title-reveal">
                  {currentRegion.name} Contacts & Inquiries
                </h2>
              </div>
              <p className="contact-intro-text">
                For queries regarding {currentRegion.name} applications or event logistics, reach out to our regional leadership below.
              </p>
            </div>

            <div className="contact-links-grid">
              <div className="contact-block zonal-reveal zonal-reveal--delay-1">
                <div className="block-label">{currentRegion.shortName.toUpperCase()} REGIONAL COORDINATORS</div>
                <div className="coordinators-list">
                  {currentRegion.contacts.map((c, idx) => (
                    <div className="coordinator-item" key={idx}>
                      <span className="coord-name">{c.name}</span>
                      <a href={`tel:${c.tel}`} className="coord-phone">
                        <PhoneIcon /> {c.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="contact-block zonal-reveal zonal-reveal--delay-2">
                <div className="block-label">OFFICIAL EMAIL</div>
                <div className="email-display">
                  <a
                    href={`mailto:${generalContacts.email}`}
                    className="outreach-email-link"
                    rel="noopener noreferrer"
                  >
                    <MailIcon /> {generalContacts.email}
                  </a>
                  <span className="email-note">
                    Official regional responses typically within 24 hours
                  </span>
                </div>
              </div>

              <div className="contact-block zonal-reveal zonal-reveal--delay-3">
                <div className="block-label">CENTRAL APPLICATION PORTAL</div>
                <div className="unstop-box">
                  <p className="unstop-desc">{generalContacts.unstopInfo}</p>
                  <a
                    href="https://unstop.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="unstop-btn"
                  >
                    Visit Unstop Portal →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= REGISTRATION QR CODE MODAL ================= */}
      {activeModalEvent && (
        <div
          className="qr-modal-backdrop"
          onClick={() => setActiveModalEvent(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="qr-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setActiveModalEvent(null)}
              aria-label="Close Modal"
            >
              <CloseIcon />
            </button>

            <div className="modal-header">
              <span className="modal-category">{currentRegion.shortName.toUpperCase()} • {activeModalEvent.category}</span>
              <h3 className="modal-event-title">{activeModalEvent.name}</h3>
              <p className="modal-prize-tag">PRIZE POOL: {activeModalEvent.prizePool}</p>
            </div>

            <div className="modal-qr-frame">
              <img
                src={activeModalEvent.qrImage}
                alt={`${activeModalEvent.name} (${currentRegion.name}) Registration QR`}
                className="modal-qr-img"
              />
            </div>

            <div className="modal-footer-info">
              <p className="modal-instruction">
                Scan using Google Lens, Paytm, or any QR scanner on your phone to submit your application for {currentRegion.name}.
              </p>
              <div className="modal-contact-row">
                <span>Regional Coordinator: </span>
                <strong>{activeModalEvent.contact.name}</strong> (
                <a href={`tel:${activeModalEvent.contact.tel}`}>
                  {activeModalEvent.contact.phone}
                </a>
                )
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Zonals;
