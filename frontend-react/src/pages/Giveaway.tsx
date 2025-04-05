import React, { useState } from "react";
import "./Giveaway.css";

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
    <div className="giveaway">
      <h1>Welcome to pets giveaway!</h1>
      <p className="intro">
        If you have a pet that needs a new home, you've come to the right place.
        Share details about your cat or dog, including their breed, age, gender,
        and temperament. Your furry friend could find a loving family through
        PetAdopt. Fill out the form to get started.
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
          <label htmlFor="breed">Pet breed:</label>
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
            <label htmlFor="mixedBreed">Mixed breed</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ageCategory">
            Pet age:
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
            </select>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="gender">
            Pet gender:
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>
        </div>

        <div className="form-group social-group">
          <p>Is your pet social?</p>
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

        <div className="form-group">
          <label htmlFor="more">
            Tell us more:
            <input
              type="text"
              id="more"
              name="more"
              value={formData.more}
              onChange={handleInputChange}
              placeholder="Additional information about your pet"
            />
          </label>
        </div>

        <fieldset className="owner-info">
          <legend>Current owner information</legend>
          <div className="form-group">
            <label htmlFor="ownerName">
              Name:
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="ownerEmail">
              Email:
              <input
                type="email"
                id="ownerEmail"
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
        </fieldset>

        <div className="buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {message && (
          <p
            className={
              message.includes("successful")
                ? "success-message"
                : "error-message"
            }
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Giveaway;
