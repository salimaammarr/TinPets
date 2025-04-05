import React, { useState } from "react";
import "./FindPets.css";

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
        // Handle the response data
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
    <div className="find-pets">
      <h1>Find your future bestfriend!</h1>
      <p className="intro">
        Looking for a specific type of pet? Use our search form to find the
        perfect match for your family. Choose the species, breed, preferred age,
        gender, and more to narrow down your search and discover pets that fit
        your criteria.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="species">
            Species:
            <select
              id="species"
              name="species"
              value={formData.species}
              onChange={handleInputChange}
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </label>
        </div>

        <div className="form-group breed-group">
          <label htmlFor="breed">Preferred breed:</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleInputChange}
            disabled={noPreferenceBreed}
          />
          <div className="breed-preference">
            <input
              type="radio"
              id="mixedBreed"
              name="breedPreference"
              checked={noPreferenceBreed}
              onChange={handleBreedPreferenceChange}
            />
            <label htmlFor="mixedBreed">No preference</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ageCategory">
            Preferred age:
            <select
              id="ageCategory"
              name="ageCategory"
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
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="gender">
            Preferred gender:
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option>Male</option>
              <option>Female</option>
              <option>No preference</option>
            </select>
          </label>
        </div>

        <div className="form-group social-group">
          <p>Do you need your pet to be social?</p>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="social"
                value="yes"
                checked={formData.social === "yes"}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="social"
                value="no"
                checked={formData.social === "no"}
                onChange={handleInputChange}
              />
              No
            </label>
          </div>
        </div>

        <div className="buttons">
          <button type="submit">Find my bestfriend</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default FindPets;
