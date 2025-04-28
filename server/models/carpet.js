const mongoose = require('mongoose');

const carpetSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
  },
  { timestamps: true }
);

const Carpet = mongoose.model('Carpet', carpetSchema);

module.exports = Carpet;