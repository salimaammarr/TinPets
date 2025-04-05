import React, { useState } from "react";

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
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-custom-green">
            <div className="card-body p-4">
              <h1 className="text-center mb-3 text-custom-brown">
                Let's get in touch!
              </h1>
              <p className="text-muted text-center mb-4">
                We value your feedback and are here to assist you. If you have
                any questions, concerns, or simply want to get in touch, please
                feel free to contact us. Your satisfaction and the well-being of
                our furry friends are our top priorities.
              </p>

              <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="form-label text-custom-brown"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label text-custom-brown"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="subject"
                    className="form-label text-custom-brown"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="form-label text-custom-brown"
                  >
                    Message *
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                  />
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-center">
                  <button type="submit" className="btn btn-custom-primary px-4">
                    Send Message
                  </button>
                  <button
                    type="button"
                    className="btn btn-custom-secondary px-4"
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
                  <div
                    className={`alert ${
                      submitStatus.type === "success"
                        ? "alert-success"
                        : "alert-danger"
                    } mt-3 text-center`}
                  >
                    {submitStatus.message}
                  </div>
                )}
              </form>

              <div className="border-top border-custom-beige pt-4">
                <h2 className="h4 mb-3 text-custom-brown">
                  Additional Contact Information
                </h2>
                <p className="text-muted mb-3">
                  You can also reach us through the following channels:
                </p>
                <ul className="list-unstyled text-muted">
                  <li className="mb-2">Email: info@tinpets.com</li>
                  <li className="mb-2">Phone: (555) 123-4567</li>
                  <li>Hours: Monday - Friday, 9:00 AM - 5:00 PM EST</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
