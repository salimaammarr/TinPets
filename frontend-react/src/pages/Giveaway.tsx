import React, { useState } from "react";

interface PetFormData {
  species: string;
  breed: string;
  ageCategory: string;
  gender: string;
  social: string;
  more: string;
  ownerName: string;
  ownerEmail: string;
}

const Giveaway: React.FC = () => {
  const [formData, setFormData] = useState<PetFormData>({
    species: "dog",
    breed: "",
    ageCategory: "Less than 1 year",
    gender: "Male",
    social: "",
    more: "",
    ownerName: "",
    ownerEmail: "",
  });

  const [noPreferenceBreed, setNoPreferenceBreed] = useState(false);
  const [message, setMessage] = useState("");

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
      breed: isNoPreference ? "mixed breed" : "",
    }));
  };

  const validateForm = () => {
    if (!formData.social) {
      setMessage("Please indicate if your pet is social.");
      return false;
    }
    if (!noPreferenceBreed && !formData.breed) {
      setMessage('Please enter a breed or select "Mixed breed".');
      return false;
    }
    if (!formData.ownerName.trim()) {
      setMessage("Please enter your name.");
      return false;
    }
    if (!formData.ownerEmail.trim()) {
      setMessage("Please enter your email.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ownerEmail)) {
      setMessage("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("/api/registerPet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Pet registration successful! We will contact you soon.");
        // Reset form
        setFormData({
          species: "dog",
          breed: "",
          ageCategory: "Less than 1 year",
          gender: "Male",
          social: "",
          more: "",
          ownerName: "",
          ownerEmail: "",
        });
        setNoPreferenceBreed(false);
      } else {
        const data = await response.json();
        setMessage(data.message || "Failed to register pet. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handleReset = () => {
    setFormData({
      species: "dog",
      breed: "",
      ageCategory: "Less than 1 year",
      gender: "Male",
      social: "",
      more: "",
      ownerName: "",
      ownerEmail: "",
    });
    setNoPreferenceBreed(false);
    setMessage("");
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="text-center mb-3">Welcome to pets giveaway!</h1>
              <p className="text-muted text-center mb-4">
                If you have a pet that needs a new home, you've come to the
                right place. Share details about your cat or dog, including
                their breed, age, gender, and temperament. Your furry friend
                could find a loving family through PetAdopt. Fill out the form
                to get started.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="species" className="form-label">
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
                  <label htmlFor="breed" className="form-label">
                    Pet breed:
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
                    <label className="form-check-label" htmlFor="mixedBreed">
                      Mixed breed
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="ageCategory" className="form-label">
                    Pet age:
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
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Pet gender:
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
                  </select>
                </div>

                <div className="mb-4">
                  <p className="mb-2">Is your pet social?</p>
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
                      <label className="form-check-label" htmlFor="socialYes">
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
                      <label className="form-check-label" htmlFor="socialNo">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="more" className="form-label">
                    Tell us more:
                  </label>
                  <input
                    type="text"
                    id="more"
                    name="more"
                    className="form-control"
                    value={formData.more}
                    onChange={handleInputChange}
                    placeholder="Additional information about your pet"
                  />
                </div>

                <fieldset className="border rounded p-3 mb-4">
                  <legend className="float-none w-auto px-2 fs-6">
                    Current owner information
                  </legend>
                  <div className="mb-3">
                    <label htmlFor="ownerName" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="ownerName"
                      name="ownerName"
                      className="form-control"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-0">
                    <label htmlFor="ownerEmail" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="ownerEmail"
                      name="ownerEmail"
                      className="form-control"
                      value={formData.ownerEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </fieldset>

                <div className="d-grid gap-2 d-md-flex justify-content-center">
                  <button type="submit" className="btn btn-primary px-4">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary px-4"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>

                {message && (
                  <div
                    className={`alert ${
                      message.includes("successful")
                        ? "alert-success"
                        : "alert-danger"
                    } mt-3 text-center`}
                  >
                    {message}
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

export default Giveaway;
