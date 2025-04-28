const express = require('express');
const { getCarpets, getCarpetById } = require('../controllers/carpetController'); 
const router = express.Router();

// Route to get all carpets
router.get('/', getCarpets); 

// Route to get carpet by ID
router.get('/:id', getCarpetById);

module.exports = router;