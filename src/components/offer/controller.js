const express = require('express');
const Model = require('./model');

const router = express.Router();

router.get('/offers', (req, res) => {
  Model.find()
    .then(offers => res.send(offers));
});

router.post('/offers', (req, res) => {
  new Model(req.body).save(err => {
    if(err) {
      return res.send(err);
    }
    return res.send('Success');
  });
});

router.put('/offers/:id', (req, res) => {
  Model.update({_id: req.params.id}, req.body, err => {
    if(err) {
      return res.send(err);
    }
    return res.send('Success');
  });
});

router.delete('/offers/:id', (req, res) => {
  Model.remove({_id: req.params.id}, err => {
    if(err) {
      return res.send(err);
    }
    return res.send('Success');
  });
});

module.exports = router;
