import React from "react";

const Disclaimer: React.FC = () => {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-custom-green">
            <div className="card-body p-4">
              <h1 className="text-center mb-4 text-custom-brown">Important</h1>
              <div className="d-flex flex-column gap-4">
                <section className="p-3 bg-light rounded border-start border-4 border-custom-green">
                  <h2 className="h4 mb-3 text-custom-brown">
                    Privacy and Data Protection
                  </h2>
                  <p className="text-muted mb-0">
                    We value your privacy and the integrity of your information.
                    We promise that your personal details and any information
                    provided will never be sold or misused in any manner. Your
                    trust is important to us, and we are committed to ensuring
                    the confidentiality and security of all data shared with us.
                  </p>
                </section>

                <section className="p-3 bg-light rounded border-start border-4 border-custom-beige">
                  <h2 className="h4 mb-3 text-custom-brown">
                    Information Accuracy
                  </h2>
                  <p className="text-muted mb-0">
                    Please note that while we strive to provide accurate and
                    up-to-date information, we rely on pet owners to provide
                    correct details about their pets. We cannot be held
                    responsible for any inaccuracies in the information posted
                    by pet owners on our platform. We encourage all users to
                    verify the details independently before making any decisions
                    based on the information found here.
                  </p>
                </section>

                <section className="p-3 bg-light rounded border-start border-4 border-custom-pink">
                  <h2 className="h4 mb-3 text-custom-brown">Our Commitment</h2>
                  <p className="text-muted mb-0">
                    Thank you for choosing our platform. Your safety and trust
                    are our top priorities. We are dedicated to maintaining a
                    transparent and secure environment for all our users,
                    whether they are looking to adopt a pet or find a new home
                    for one.
                  </p>
                </section>

                <div className="text-center p-3 bg-light rounded mt-2">
                  <p className="mb-0">
                    If you have any questions or concerns about our privacy
                    practices or the information on our platform, please don't
                    hesitate to{" "}
                    <a
                      href="/contact"
                      className="text-custom-brown text-decoration-none fw-medium"
                    >
                      contact us
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
