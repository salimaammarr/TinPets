import React, { useState } from "react";
import "./ContactUs.css";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    try {
      // TODO: Implement actual API call to send message
      // For now, simulate a successful submission
      setSubmitStatus({
        type: "success",
        message: "Thank you for your message! We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="contact-us">
      <h1>Let's get in touch!</h1>
      <p className="intro">
        We value your feedback and are here to assist you. If you have any
        questions, concerns, or simply want to get in touch, please feel free to
        contact us. Your satisfaction and the well-being of our furry friends
        are our top priorities.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            required
          />
        </div>

        <div className="buttons">
          <button type="submit">Send Message</button>
          <button
            type="button"
            onClick={() =>
              setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
              })
            }
          >
            Reset
          </button>
        </div>

        {submitStatus.type && (
          <p
            className={`status-message ${
              submitStatus.type === "success" ? "success" : "error"
            }`}
          >
            {submitStatus.message}
          </p>
        )}
      </form>

      <div className="contact-info">
        <h2>Additional Contact Information</h2>
        <p>You can also reach us through the following channels:</p>
        <ul>
          <li>Email: info@tinpets.com</li>
          <li>Phone: (555) 123-4567</li>
          <li>Hours: Monday - Friday, 9:00 AM - 5:00 PM EST</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactUs;
