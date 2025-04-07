const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Unnamed Pet",
    trim: true,
  },
  species: {
    type: String,
    required: true,
    enum: ["dog", "cat", "other"],
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Unknown"],
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "/default-pet.jpg",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
  },
  isSocial: {
    type: Boolean,
    default: true,
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
