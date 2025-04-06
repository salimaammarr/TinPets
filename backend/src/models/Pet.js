const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  species: {
    type: String,
    required: true,
    enum: ["Dog", "Cat", "Other"],
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: String,
    required: true,
    enum: ["Puppy/Kitten", "Young", "Adult", "Senior"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Pending", "Adopted"],
    default: "Available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
