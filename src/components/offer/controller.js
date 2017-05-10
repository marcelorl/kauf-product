const express = require('express');
const Model = require('./model');

const router = express.Router();

router.get('/offers', (req, res) => {
  return Model.find();
});

router.post('/offers', (req, res) => {
  return Model.find();
});

router.put('/offers/:id', (req, res) => {
  return Model.find();
});

router.delete('/offers/:id', (req, res) => {
  return Model.find();
});

module.exports = router;
