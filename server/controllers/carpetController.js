const Carpet = require('../models/carpet');

// GET all carpets
const getCarpets = async (req, res) => {
    try {
      const searchTerm = req.query.search || '';  // Get search term from query params
      const carpets = await Carpet.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } }
        ]
      });
      res.json(carpets);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching carpets' });
    }
  };

// GET single carpet by ID
const getCarpetById = async (req, res) => {
  try {
    const carpet = await Carpet.findById(req.params.id); // Fetch carpet by its ID
    if (!carpet) {
      return res.status(404).json({ message: 'Carpet not found' });
    }
    res.json(carpet); // Send the found carpet as a response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle error
  }
};

// POST a new carpet (for testing purposes)
const createCarpet = async (req, res) => {
  const carpet = new Carpet({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
  });

  try {
    const newCarpet = await carpet.save(); // Save the new carpet to the database
    res.status(201).json(newCarpet); // Return the created carpet
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle errors if the carpet cannot be created
  }
};

module.exports = { getCarpets, getCarpetById, createCarpet };