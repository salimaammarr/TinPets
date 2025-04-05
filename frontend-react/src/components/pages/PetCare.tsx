import React, { useState } from "react";

const PetCare: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dog" | "cat">("dog");

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-custom-yellow">
            <div className="card-body p-4">
              <h1 className="text-center text-custom-navy mb-4">
                Pet Care Guide
              </h1>

              {/* Tab Navigation */}
              <div className="d-flex justify-content-center mb-4">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Pet care tabs"
                >
                  <button
                    type="button"
                    className={`btn ${
                      activeTab === "dog"
                        ? "btn-custom-primary"
                        : "btn-custom-secondary"
                    }`}
                    onClick={() => setActiveTab("dog")}
                  >
                    <i className="fas fa-dog me-2"></i>
                    Dog Care
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      activeTab === "cat"
                        ? "btn-custom-primary"
                        : "btn-custom-secondary"
                    }`}
                    onClick={() => setActiveTab("cat")}
                  >
                    <i className="fas fa-cat me-2"></i>
                    Cat Care
                  </button>
                </div>
              </div>

              {/* Dog Care Content */}
              {activeTab === "dog" && (
                <div>
                  <h2 className="text-custom-navy mb-3">
                    Essential Dog Care Tips
                  </h2>

                  <div className="mb-4">
                    <h3 className="h5 text-custom-orange">
                      <i className="fas fa-bone me-2"></i>
                      Nutrition
                    </h3>
                    <p>
                      Provide high-quality dog food appropriate for your dog's
                      age, size, and activity level. Always ensure fresh water
                      is available. Avoid feeding table scraps and toxic foods
                      like chocolate.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="h5 text-custom-orange">
                      <i className="fas fa-heart me-2"></i>
                      Exercise
                    </h3>
                    <p>
                      Regular exercise is crucial for your dog's physical and
                      mental health. Daily walks, playtime, and interactive
                      games help maintain a healthy weight and prevent boredom.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="h5 text-custom-orange">
                      <i className="fas fa-medkit me-2"></i>
                      Health Care
                    </h3>
                    <p>
                      Schedule regular vet check-ups, keep vaccinations up to
                      date, and maintain dental hygiene. Watch for changes in
                      behavior or appetite that might indicate health issues.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="h5 text-custom-orange">
                      <i className="fas fa-bath me-2"></i>
                      Grooming
                    </h3>
                    <p>
                      Regular brushing, nail trimming, and bathing as needed.
                      The frequency depends on your dog's breed and coat type.
                      Keep ears clean and check for parasites.
                    </p>
                  </div>
                </div>
              )}

              {/* Cat Care Content */}
              {activeTab === "cat" && (
                <div>
                  <h2 className="text-custom-navy mb-3">
                    Essential Cat Care Tips
                  </h2>

                  <div className="mb-4">
                    <h3 className="h5 text-custom-orange">
                      <i className="fas fa-fish me-2"></i>
                      Nutrition
                    </h3>
                    <p>
                      Feed high-quality cat food suitable for your cat's age and
                      health needs. Provide fresh water daily. Consider wet food
                      for additional hydration.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="h5 text-custom-orange">
                      <i className="fas fa-home me-2"></i>
                      Environment
                    </h3>
                    <p>
                      Create a stimulating environment with climbing spaces,
                      scratching posts, and hiding spots. Keep the litter box
                      clean and in a quiet location.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="h5 text-custom-orange">
                      <i className="fas fa-medkit me-2"></i>
                      Health Care
                    </h3>
                    <p>
                      Regular vet check-ups are essential. Keep vaccinations
                      current and watch for changes in behavior, appetite, or
                      litter box habits.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="h5 text-custom-orange">
                      <i className="fas fa-heart me-2"></i>
                      Exercise & Play
                    </h3>
                    <p>
                      Engage your cat in daily play sessions with toys that
                      encourage hunting and chasing. This helps maintain
                      physical and mental health.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCare;
