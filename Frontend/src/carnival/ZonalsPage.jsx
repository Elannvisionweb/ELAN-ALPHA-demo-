import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useLenis } from "lenis/react";
import CarnivalNav from "./CarnivalNav.jsx";
import curtain from "/src/assets/carnival/curtain.jpg";
import {
  festHighlights,
  generalContacts,
  pastArtists,
  zonalRegions,
  zonalsMeta,
} from "/src/data/zonals_data.js";
import "./carnival.css";
import "./pages.css";
import Footer from "/src/components/Footer/Footer.jsx";

function ExternalLinkIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function ZonalsPage() {
  const region = useMemo(() => Object.values(zonalRegions || {})[0], []);
  const events = region?.events || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalEvent, setModalEvent] = useState(null);
  const activeIndexRef = useRef(0);
  const scrollRef = useRef(null);
  const stickyRef = useRef(null);
  const wheelRef = useRef(null);

  const updateWheelFromScroll = useCallback(() => {
    const container = scrollRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky || events.length < 2) return;

    const totalScrollable = container.offsetHeight - sticky.offsetHeight;
    if (totalScrollable <= 0) return;

    const stickyTop = parseFloat(window.getComputedStyle(sticky).top) || 0;
    const progress = Math.min(
      1,
      Math.max(
        0,
        (-container.getBoundingClientRect().top + stickyTop) / totalScrollable
      )
    );

    // Rotate directly from scroll progress. Keeping this outside React state
    // prevents the wheel from snapping between the five selected events.
    const rotation =
      progress * (events.length - 1) * (360 / events.length);
    wheelRef.current?.style.setProperty(
      "--cv-wheel-rotation",
      `${rotation}deg`
    );
    wheelRef.current?.style.setProperty(
      "--cv-wheel-counter-rotation",
      `${-rotation}deg`
    );

    const next = Math.round(progress * (events.length - 1));
    if (next !== activeIndexRef.current) {
      activeIndexRef.current = next;
      setActiveIndex(next);
    }
  }, [events.length]);

  const lenis = useLenis(() => updateWheelFromScroll());

  useEffect(() => {
    let frame;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        updateWheelFromScroll();
        frame = undefined;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [updateWheelFromScroll]);

  const selectEvent = (index) => {
    const container = scrollRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky || events.length < 2) return;

    const totalScrollable = container.offsetHeight - sticky.offsetHeight;
    const stickyTop = parseFloat(window.getComputedStyle(sticky).top) || 0;
    const target =
      window.scrollY +
      container.getBoundingClientRect().top +
      (index / (events.length - 1)) * totalScrollable -
      stickyTop;

    activeIndexRef.current = index;
    setActiveIndex(index);
    wheelRef.current?.style.setProperty(
      "--cv-wheel-rotation",
      `${index * (360 / events.length)}deg`
    );
    wheelRef.current?.style.setProperty(
      "--cv-wheel-counter-rotation",
      `${-index * (360 / events.length)}deg`
    );

    if (lenis) {
      lenis.scrollTo(target, { duration: 0.65 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  if (!region) return null;
  const activeEvent = events[activeIndex];
  const segment = events.length ? 360 / events.length : 0;

  return (
    <>
      <Helmet>
        <title>Zonal Eliminations | Elan &amp; nVision, IIT Hyderabad</title>
        <meta
          name="description"
          content="North Zonal Eliminations for Elan & nVision IIT Hyderabad. Compete for a place at the Grand Finale."
        />
      </Helmet>

      <main
        className="cv-page cv-zonals"
        style={{ "--cv-curtain-img": `url(${curtain})` }}
      >
        <CarnivalNav />

        <header className="cv-page-head cv-zonals-head">
          <span className="cv-eyebrow">
            IIT Hyderabad presents · {zonalsMeta.edition}
          </span>
          <h1 className="cv-page-title">{region.name} Eliminations</h1>
          <div className="cv-zone-banner">
            <span className="cv-live-dot" aria-hidden="true" />
            <strong>{region.shortName}</strong>
            <span>{region.shortDate}</span>
            <span className="cv-zone-open">Applications Open</span>
          </div>
          <p className="cv-page-lede">{zonalsMeta.intro}</p>
          <div className="cv-rule">
            <span />
            <i>✦</i>
            <span />
          </div>
        </header>

        <section className="cv-section cv-zonal-overview" aria-label="Zonal overview">
          <div className="cv-zonal-copy">
            <span className="cv-kicker">The Road To The Finale</span>
            <h2 className="cv-section-title">Your First Shot At The Spotlight</h2>
            <p>{region.applicationNotice}</p>
            <p>{zonalsMeta.format}</p>
          </div>
          <dl className="cv-zonal-facts">
            <div>
              <dt>Eliminations Date</dt>
              <dd>{region.date}</dd>
            </div>
            <div>
              <dt>Prize Pool</dt>
              <dd>{zonalsMeta.totalPrize}</dd>
            </div>
            <div>
              <dt>Grand Finale</dt>
              <dd>{zonalsMeta.grandFinale}</dd>
            </div>
            <div>
              <dt>States Covered</dt>
              <dd>{region.coveredStates}</dd>
            </div>
          </dl>
        </section>

        <section className="cv-zonal-stats" aria-label="Festival highlights">
          {(festHighlights || []).slice(0, 5).map((highlight) => (
            <div key={highlight.label}>
              <strong>{highlight.value}</strong>
              <span>{highlight.label}</span>
            </div>
          ))}
        </section>

        <section className="cv-wheel-section" aria-labelledby="cv-wheel-title">
          <div className="cv-wheel-heading">
            <span className="cv-kicker">{region.shortName} Flagship Competitions</span>
            <h2 id="cv-wheel-title" className="cv-section-title">Events At A Glance</h2>
            <p>Scroll to turn the wheel, or choose an act directly.</p>
          </div>

          <nav className="cv-wheel-tabs" aria-label="Zonal events">
            {events.map((event, index) => (
              <button
                key={event.id}
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => selectEvent(index)}
              >
                <span>0{index + 1}</span>
                {event.name}
              </button>
            ))}
          </nav>

          <div className="cv-wheel-scroll" ref={scrollRef}>
            <div className="cv-wheel-sticky" ref={stickyRef}>
              <div className="cv-wheel-background" aria-hidden="true">
                {events.map((event, index) => (
                  <img
                    key={event.id}
                    className={index === activeIndex ? "is-active" : ""}
                    src={event.image}
                    alt=""
                  />
                ))}
              </div>

              {activeEvent && (
                <article className="cv-wheel-detail" key={activeEvent.id}>
                  <div className="cv-wheel-detail-meta">
                    <span>0{activeIndex + 1}</span>
                    <span>{activeEvent.date}</span>
                    <span>{activeEvent.category}</span>
                  </div>
                  <h3>{activeEvent.name}</h3>
                  <p>{activeEvent.description}</p>
                  <div className="cv-wheel-prize">
                    <span>Prize Pool</span>
                    <strong>{activeEvent.prizePool}</strong>
                  </div>
                  <p className="cv-wheel-contact">
                    <strong>Coordinator:</strong> {activeEvent.contact.name}{" "}
                    <a href={`tel:${activeEvent.contact.tel}`}>{activeEvent.contact.phone}</a>
                  </p>
                  <div className="cv-wheel-actions">
                    <a
                      className="cv-btn"
                      href={activeEvent.unstopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Register on Unstop <ExternalLinkIcon />
                    </a>
                    <button className="cv-qr-btn" onClick={() => setModalEvent(activeEvent)}>
                      Registration QR
                    </button>
                  </div>
                </article>
              )}

              <div className="cv-wheel-stage" aria-label={`${activeEvent?.name || ""} selected`}>
                <span className="cv-wheel-instruction">Scroll To Select</span>
                <span className="cv-wheel-pointer" aria-hidden="true">◆</span>
                <div
                  className="cv-wheel"
                  ref={wheelRef}
                >
                  <div className="cv-wheel-ring cv-wheel-ring--outer" />
                  <div className="cv-wheel-ring cv-wheel-ring--inner" />
                  {events.map((event, index) => (
                    <div
                      className={`cv-wheel-item ${index === activeIndex ? "is-active" : ""}`}
                      key={event.id}
                      style={{
                        "--cv-wheel-angle": `${180 - index * segment}deg`,
                        "--cv-wheel-counter-angle": `${-180 + index * segment}deg`,
                      }}
                    >
                      <button onClick={() => selectEvent(index)} aria-pressed={index === activeIndex}>
                        <img src={event.image} alt="" />
                        <span>
                          <small>0{index + 1}</small>
                          {event.name}
                        </span>
                      </button>
                    </div>
                  ))}
                  <div className="cv-wheel-hub">
                    <strong>0{activeIndex + 1}</strong>
                    <span>OF 0{events.length}</span>
                  </div>
                </div>
                <div className="cv-wheel-progress" aria-hidden="true">
                  <span>01</span>
                  <i style={{ transform: `scaleX(${events.length ? (activeIndex + 1) / events.length : 0})` }} />
                  <span>0{events.length}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cv-section" aria-labelledby="cv-perks-title">
          <h2 id="cv-perks-title" className="cv-section-title">What Winners Take Home</h2>
          <div className="cv-perks">
            {(zonalsMeta.perks || []).map((perk) => (
              <article className="cv-perk" key={perk.title}>
                <h3>{perk.title}</h3>
                <p>{perk.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section" aria-labelledby="cv-stage-legacy-title">
          <span className="cv-kicker">Stage Legacy</span>
          <h2 id="cv-stage-legacy-title" className="cv-section-title">Artists Who Have Graced Our Stage</h2>
          <div className="cv-artist-cloud">
            {(pastArtists || []).map((artist) => <span key={artist}>✦ {artist}</span>)}
          </div>
        </section>

        <section className="cv-section" aria-labelledby="cv-contacts-title">
          <h2 id="cv-contacts-title" className="cv-section-title">Contacts &amp; Inquiries</h2>
          <div className="cv-zonal-contacts">
            <article className="cv-perk">
              <h3>{region.shortName} Coordinators</h3>
              {(region.contacts || []).map((contact) => (
                <p key={contact.tel}><strong>{contact.name}</strong> · <a href={`tel:${contact.tel}`}>{contact.phone}</a></p>
              ))}
            </article>
            <article className="cv-perk">
              <h3>Official Email</h3>
              <p><a href={`mailto:${generalContacts.email}`}>{generalContacts.email}</a></p>
              <p>Official regional responses typically within 24 hours.</p>
            </article>
            <article className="cv-perk">
              <h3>Application Portal</h3>
              <p>{generalContacts.unstopInfo}</p>
              <p><a className="cv-text-link" href="https://unstop.com" target="_blank" rel="noopener noreferrer">Visit Unstop Portal <ExternalLinkIcon /></a></p>
            </article>
          </div>
        </section>
      </main>

      <Footer />

      {modalEvent && (
        <div className="cv-qr-modal" role="dialog" aria-modal="true" aria-label={`${modalEvent.name} registration QR`} onClick={() => setModalEvent(null)}>
          <div className="cv-qr-modal-card" onClick={(event) => event.stopPropagation()}>
            <button className="cv-qr-close" onClick={() => setModalEvent(null)} aria-label="Close registration QR">×</button>
            <span className="cv-kicker">{region.shortName} · {modalEvent.category}</span>
            <h2>{modalEvent.name}</h2>
            <img src={modalEvent.qrImage} alt={`${modalEvent.name} registration QR`} />
            <p>Scan this code to submit your application, or register on Unstop.</p>
            <a className="cv-btn" href={modalEvent.unstopUrl} target="_blank" rel="noopener noreferrer">Register on Unstop <ExternalLinkIcon /></a>
          </div>
        </div>
      )}
    </>
  );
}
