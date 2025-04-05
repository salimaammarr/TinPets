import React, { useState } from "react";

interface SearchFormData {
  species: string;
  breed: string;
  ageCategory: string;
  gender: string;
  social: string;
}

const FindPets: React.FC = () => {
  const [formData, setFormData] = useState<SearchFormData>({
    species: "dog",
    breed: "",
    ageCategory: "No preference",
    gender: "No preference",
    social: "",
  });

  const [noPreferenceBreed, setNoPreferenceBreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBreedPreferenceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isNoPreference = e.target.id === "mixedBreed";
    setNoPreferenceBreed(isNoPreference);
    setFormData((prev) => ({
      ...prev,
      breed: isNoPreference ? "No preference" : "",
    }));
  };

  const validateForm = () => {
    if (!formData.social) {
      setErrorMessage("Please select whether you need your pet to be social.");
      return false;
    }
    if (!noPreferenceBreed && !formData.breed) {
      setErrorMessage('Please enter a breed or select "No preference".');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("/api/findPets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful search - redirect to results page or update UI
        const data = await response.json();
        console.log("Search results:", data);
        // TODO: Implement results display or redirection
      } else {
        setErrorMessage("Failed to search for pets. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleReset = () => {
    setFormData({
      species: "dog",
      breed: "",
      ageCategory: "No preference",
      gender: "No preference",
      social: "",
    });
    setNoPreferenceBreed(false);
    setErrorMessage("");
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-custom-green">
            <div className="card-body p-4">
              <h1 className="text-center mb-3 text-custom-brown">
                Find your future bestfriend!
              </h1>
              <p className="text-muted text-center mb-4">
                Looking for a specific type of pet? Use our search form to find
                the perfect match for your family. Choose the species, breed,
                preferred age, gender, and more to narrow down your search and
                discover pets that fit your criteria.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="species"
                    className="form-label text-custom-brown"
                  >
                    Species:
                  </label>
                  <select
                    id="species"
                    name="species"
                    className="form-select"
                    value={formData.species}
                    onChange={handleInputChange}
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="breed"
                    className="form-label text-custom-brown"
                  >
                    Preferred breed:
                  </label>
                  <input
                    type="text"
                    id="breed"
                    name="breed"
                    className="form-control mb-2"
                    value={formData.breed}
                    onChange={handleInputChange}
                    disabled={noPreferenceBreed}
                  />
                  <div className="form-check">
                    <input
                      type="radio"
                      id="mixedBreed"
                      name="breedPreference"
                      className="form-check-input"
                      checked={noPreferenceBreed}
                      onChange={handleBreedPreferenceChange}
                    />
                    <label
                      className="form-check-label text-custom-brown"
                      htmlFor="mixedBreed"
                    >
                      No preference
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="ageCategory"
                    className="form-label text-custom-brown"
                  >
                    Preferred age:
                  </label>
                  <select
                    id="ageCategory"
                    name="ageCategory"
                    className="form-select"
                    value={formData.ageCategory}
                    onChange={handleInputChange}
                  >
                    <option>Less than 1 year</option>
                    <option>1 - 3 years</option>
                    <option>3 - 7 years</option>
                    <option>7 - 10 years</option>
                    <option>More than 10 years</option>
                    <option>No preference</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="gender"
                    className="form-label text-custom-brown"
                  >
                    Preferred gender:
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>No preference</option>
                  </select>
                </div>

                <div className="mb-4">
                  <p className="mb-2 text-custom-brown">
                    Do you need your pet to be social?
                  </p>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input
                        type="radio"
                        id="socialYes"
                        name="social"
                        value="yes"
                        className="form-check-input"
                        checked={formData.social === "yes"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label text-custom-brown"
                        htmlFor="socialYes"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="socialNo"
                        name="social"
                        value="no"
                        className="form-check-input"
                        checked={formData.social === "no"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label text-custom-brown"
                        htmlFor="socialNo"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-center">
                  <button type="submit" className="btn btn-custom-primary px-4">
                    Find my bestfriend
                  </button>
                  <button
                    type="button"
                    className="btn btn-custom-secondary px-4"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>

                {errorMessage && (
                  <div className="alert alert-danger mt-3 text-center">
                    {errorMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPets;
