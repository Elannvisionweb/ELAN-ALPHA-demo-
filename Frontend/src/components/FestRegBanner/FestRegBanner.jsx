import "./FestRegBanner.css";
import { useState } from "react";

export default function FestRegBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseModal, setResponseModal] = useState({
    isOpen: false,
    type: "", // 'success' or 'error'
    message: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ fullName: "", mobileNumber: "", email: "" });
  };

  const closeResponseModal = () => {
    const wasSuccess = responseModal.type === "success";
    setResponseModal({ isOpen: false, type: "", message: "" });
    if (wasSuccess) {
      closeModal();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "fest-modal-overlay") {
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/submitFestPassForm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setResponseModal({
          isOpen: true,
          type: "success",
          message: "",
        });
      } else {
        const error = await response.json();
        setResponseModal({
          isOpen: true,
          type: "error",
          message: error.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseModal({
        isOpen: true,
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="quest-banner" onClick={openModal}>
        <div className="fest-reg-title">Fest Pass Registration</div>
        <span className="quest-text">
          The fest is close - Get your passes here!
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="quest-arrow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 19L19 5M9 5h10v10"
            />
          </svg>
        </span>
      </div>

      {isModalOpen && (
        <div className="fest-modal-overlay" onClick={handleOverlayClick}>
          <div className="fest-modal">
            <button className="fest-modal-close" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2 className="fest-modal-title">Fest Pass Registration</h2>
            <p className="fest-modal-description">
              Please fill in the following details so we may send you your
              personalised fest pass.
            </p>
            <form className="fest-modal-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="fest-modal-input"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                className="fest-modal-input"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="fest-modal-input"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="fest-modal-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="submit-content">
                    <span className="spinner"></span>
                    <span>Submitting...</span>
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {responseModal.isOpen && (
        <div className="fest-modal-overlay">
          <div className="fest-response-modal">
            {responseModal.type === "success" ? (
              <>
                <div className="response-icon success-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2 className="response-title">Registration Successful</h2>
                <p className="response-message">
                  You will receive a confirmation message on your registered
                  email within 1-2 days. If any issues arise, please reach out
                  to us at{" "}
                  <a href="mailto:elan.nvision.web@sa.iith.ac.in">
                    elan.nvision.web@sa.iith.ac.in
                  </a>
                </p>
              </>
            ) : (
              <>
                <div className="response-icon error-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </div>
                <h2 className="response-title">Registration Failed</h2>
                <p className="response-message">{responseModal.message}</p>
              </>
            )}
            <button
              className="response-ok-button"
              onClick={closeResponseModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
