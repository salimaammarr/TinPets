import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

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
  const { user } = useAuth();
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
      const response = await fetch("http://localhost:5002/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          species: formData.species,
          breed: formData.breed,
          age: formData.ageCategory,
          gender: formData.gender,
          description: formData.more,
          status: "Available",
          ownerName: formData.ownerName,
          ownerEmail: formData.ownerEmail,
          isSocial: formData.social === "Yes",
        }),
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
        setMessage(data.message || "Error registering pet. Please try again.");
      }
    } catch (error) {
      setMessage("Error connecting to server. Please try again later.");
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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h2 className="text-center text-custom-navy mb-4">
                Register Your Pet for Giveaway
              </h2>
              <p className="text-muted text-center mb-4">
                Fill out the form below to register your pet for our giveaway
                program.
              </p>

              {message && (
                <div
                  className={`alert ${
                    message.includes("successful")
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                  role="alert"
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-custom-brown">
                    Pet Species
                  </label>
                  <select
                    className="form-select"
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label text-custom-brown">
                    Breed Preference
                  </label>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="breedPreference"
                      id="specificBreed"
                      checked={!noPreferenceBreed}
                      onChange={handleBreedPreferenceChange}
                    />
                    <label className="form-check-label" htmlFor="specificBreed">
                      Specific Breed
                    </label>
                  </div>
                  {!noPreferenceBreed && (
                    <input
                      type="text"
                      className="form-control"
                      name="breed"
                      value={formData.breed}
                      onChange={handleInputChange}
                      placeholder="Enter breed"
                    />
                  )}
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="breedPreference"
                      id="mixedBreed"
                      checked={noPreferenceBreed}
                      onChange={handleBreedPreferenceChange}
                    />
                    <label className="form-check-label" htmlFor="mixedBreed">
                      Mixed Breed (No Preference)
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-custom-brown">
                    Age Category
                  </label>
                  <select
                    className="form-select"
                    name="ageCategory"
                    value={formData.ageCategory}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Less than 1 year">Less than 1 year</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="4-7 years">4-7 years</option>
                    <option value="8+ years">8+ years</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label text-custom-brown">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label text-custom-brown">
                    Is your pet social with other animals?
                  </label>
                  <select
                    className="form-select"
                    name="social"
                    value={formData.social}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Sometimes">Sometimes</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label text-custom-brown">
                    Additional Information
                  </label>
                  <textarea
                    className="form-control"
                    name="more"
                    value={formData.more}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any additional information about your pet..."
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label text-custom-brown">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-custom-brown">
                    Your Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-custom-primary">
                    Submit Registration
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleReset}
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Giveaway;
