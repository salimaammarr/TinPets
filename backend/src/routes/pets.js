const express = require("express");
const Pet = require("../models/Pet");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find()
      .populate("owner", "username")
      .sort({ createdAt: -1 });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pets" });
  }
});

// Get a specific pet
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("owner", "username");
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pet" });
  }
});

// Create a new pet (protected route)
router.post("/", auth, async (req, res) => {
  try {
    const petData = {
      ...req.body,
      owner: req.userId,
    };

    const pet = new Pet(petData);
    await pet.save();

    const populatedPet = await pet.populate("owner", "username");
    res.status(201).json(populatedPet);
  } catch (error) {
    res.status(400).json({ message: "Error creating pet listing" });
  }
});

// Update a pet (protected route)
router.patch("/:id", auth, async (req, res) => {
  try {
    const pet = await Pet.findOne({ _id: req.params.id, owner: req.userId });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found or unauthorized" });
    }

    Object.assign(pet, req.body);
    await pet.save();

    const populatedPet = await pet.populate("owner", "username");
    res.json(populatedPet);
  } catch (error) {
    res.status(400).json({ message: "Error updating pet" });
  }
});

// Delete a pet (protected route)
router.delete("/:id", auth, async (req, res) => {
  try {
    const pet = await Pet.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId,
    });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found or unauthorized" });
    }
    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting pet" });
  }
});

// Search pets
router.get("/search/filters", async (req, res) => {
  try {
    const { species, age, gender } = req.query;
    const query = { status: "Available" };

    if (species) query.species = species;
    if (age) query.age = age;
    if (gender) query.gender = gender;

    const pets = await Pet.find(query)
      .populate("owner", "username")
      .sort({ createdAt: -1 });

    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error searching pets" });
  }
});

module.exports = router;
