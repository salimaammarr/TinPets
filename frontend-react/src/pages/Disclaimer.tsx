import React from "react";
import "./Disclaimer.css";

const Disclaimer: React.FC = () => {
  return (
    <div className="disclaimer">
      <h1>Important</h1>
      <div className="disclaimer-content">
        <section className="privacy-section">
          <h2>Privacy and Data Protection</h2>
          <p>
            We value your privacy and the integrity of your information. We
            promise that your personal details and any information provided will
            never be sold or misused in any manner. Your trust is important to
            us, and we are committed to ensuring the confidentiality and
            security of all data shared with us.
          </p>
        </section>

        <section className="accuracy-section">
          <h2>Information Accuracy</h2>
          <p>
            Please note that while we strive to provide accurate and up-to-date
            information, we rely on pet owners to provide correct details about
            their pets. We cannot be held responsible for any inaccuracies in
            the information posted by pet owners on our platform. We encourage
            all users to verify the details independently before making any
            decisions based on the information found here.
          </p>
        </section>

        <section className="commitment-section">
          <h2>Our Commitment</h2>
          <p>
            Thank you for choosing our platform. Your safety and trust are our
            top priorities. We are dedicated to maintaining a transparent and
            secure environment for all our users, whether they are looking to
            adopt a pet or find a new home for one.
          </p>
        </section>

        <div className="contact-info">
          <p>
            If you have any questions or concerns about our privacy practices or
            the information on our platform, please don't hesitate to{" "}
            <a href="/contact">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
