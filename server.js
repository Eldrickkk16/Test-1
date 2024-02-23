// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongo-test', {
});

// Define MongoDB schema
const courseSchema = new mongoose.Schema({
  code: { type: String, required: true},
  description: { type: String, required: true},
  units: { type: Number, required: true},
  tags: { type: [String], required: true},
});

// Define MongoDB model
const Course = mongoose.model('Course', courseSchema);

// Define API endpoints
app.get('/backend-courses', async (req, res) => {
    try {
      const courses = await Course.find({}).sort({ name: 1 });
      console.log(courses);
      res.json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
});
