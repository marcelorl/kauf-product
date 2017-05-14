const express = require('express');
const Model = require('./model');

const router = express.Router();

router.get('/offers', (req, res) => {
  Model.find()
    .then(offers => {
      const result = offers.map(offer => {
        return {
          id: offer._id,
          properties: {
            name: offer.name,
            reducedPrice: offer.reducedPrice,
            originalPrice: offer.originalPrice,
            productImagePointer: offer.productImagePointer
          },
          createdAt: offer.createdAt
        };
      });

      res.send(result);
    });
});

router.get('/offers/:id', (req, res) => {
  Model.find({_id: req.params.id})
    .then(offers => res.send(offers));
});

router.post('/offers', (req, res) => {
  const body = Object.assign(
    req.body, {
      originalPrice: {
        currencyCode: req.body.priceCode,
        amount: req.body.priceAmount
      },
      reducedPrice: {
        currencyCode: req.body.discountCode,
        amount: req.body.discountAmount
      }
    }
  );

  new Model(body).save(err => {
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
