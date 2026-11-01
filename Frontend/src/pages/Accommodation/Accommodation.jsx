import "./Accommodation.css";
import VerticalMarquee from "/src/components/VerticalMarquee/VerticalMarquee.jsx";
import Form from "../../components/Accomodation Form/Form";
import { faqs } from "/src/data/faqs.js";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";

function Accommodation() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Helmet>
        <title>Elan&nVision | Accomodation</title>
      </Helmet>
      <VerticalMarquee />
      <div className="accommodation">
        <div className="accommodation-title">Accommodation</div>
        <div className="accommodation-desc">
          {isMobile
            ? "The fest is on 9-11 January. A celebration over 3 days, we recommend you enjoy it in the best way possible, by availing your accommodation at the IIT Hyderabad campus."
            : "We are delighted to announce that the fest is scheduled to take place from January 9th to January 11th. Designed as a comprehensive three-day celebration, the event promises a vibrant array of activities. To ensure an optimal and seamless experience, we highly recommend securing accommodation directly within the IIT Hyderabad campus. By residing on-site, you will have the unique opportunity to fully immerse yourself in the festivities and enjoy unparalleled convenience throughout the duration of the event."}
        </div>

        <a
          href="https://rzp.io/rzp/Cozfuh08"
          target="_blank"
          rel="noopener noreferrer"
          className="avail-accommodation-btn"
        >
          Avail accommodation
        </a>

        <div className="general-info-title">General information</div>
        <div className="general-info-desc">
          <span className="general-info-desc-subtitle">Charges</span>
          <p>
            The workshops will take place over the weekend, so we are offering
            accommodation for one night at Rs999 (Check-in at 5pm Saturday,
            check-out at 9:30am Sunday).
          </p>
          <span className="general-info-desc-subtitle">Identification</span>
          <p>
            You will be required to produce a valid government ID at the campus
            gate, failure to do so will result in denial of entry to the campus.
            (So please make sure to carry a government ID with you.)
          </p>
          <span className="general-info-desc-subtitle">Getting to IITH</span>
          <p>
            The main gate lies on the road from Patancheru to Kandi. There’s a
            bunch of large signs and boards, so you can’t miss it. Refer to
            &nbsp;
            <a
              href="https://www.google.co.in/maps/place/Indian+Institute+of+Technology+Hyderabad/@17.5878164,78.1185007,16z/data=!4m12!1m6!3m5!1s0x3bcbefdc136bffbb:0x73414ff6594c9191!2sIndian+Institute+of+Technology+Hyderabad!8m2!3d17.5910124!4d78.1221056!3m4!1s0x3bcbefdc136bffbb:0x73414ff6594c9191!8m2!3d17.5910124!4d78.1221056?hl=en&shorturl=1"
              rel="noopener noreferrer"
              target="_blank"
              className="underline-white"
            >
              Google maps&#8599;
            </a>
            &nbsp; for the exact address. One can reach Patancheru by either bus
            or train. From Patancheru, one can reach the IIT main gate by either
            bus or auto. Refer to this &nbsp;
            <a
              href="https://docs.google.com/document/d/1ZQ-3vjjTGqcrJz5AlP-OnhCsuWZ6kTPfUqWmgh8EG2E/edit#heading=h.a3fdoraw0z8d"
              rel="noopener noreferrer"
              target="_blank"
              className="underline-white"
            >
              document&#8599;
            </a>
            &nbsp; for more details.
          </p>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7606.628073993554!2d78.1185007!3d17.5878164!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbefdc136bffbb%3A0x73414ff6594c9191!2sIndian%20Institute%20of%20Technology%20Hyderabad!5e0!3m2!1sen!2sin!4v1720524171417!5m2!1sen!2sin"
            width="450"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* <div className="accomodation-form-container">
          <div className="accomodation-form-title">Apply for Accomodation</div>
          <Form />
        </div> */}

        <div className="faq-title">FAQs</div>
        {faqs.map((faq, index) => (
          <div className="faq-cont" key={index}>
            <div className="faq-top">
              <span>&rarr;</span>
              <div className="faq-question">{faq.question}</div>
            </div>
            <div className="faq-answer">
              {faq.answer.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Accommodation;
