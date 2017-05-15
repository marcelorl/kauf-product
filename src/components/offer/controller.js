const express = require('express');
const multer  = require('multer');

const Model = require('./model');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

const setBody = (reqBody, reqFile) => {
  let image = {};
  if(reqFile) {
    image = {
      productImagePointer: {
        itemName: reqFile.originalname
      }
    };
  }

  const body = Object.assign(
    reqBody, {
      originalPrice: {
        currencyCode: reqBody.priceCode || '',
        amount: reqBody.priceAmount || 0
      },
      reducedPrice: {
        currencyCode: reqBody.discountCode || '',
        amount: reqBody.discountAmount || 0
      }
    },
    image
  );

  return body;
};

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

router.post('/offers', upload.single('productImagePointer'), (req, res) => {
  const body = setBody(req.body, req.file);

  new Model(body).save(err => {
    if(err) {
      return res.send(err);
    }
    return res.send('Success');
  });
});

router.put('/offers/:id', upload.single('productImagePointer'), (req, res) => {
  const body = setBody(req.body, req.file);

  Model.update({_id: req.params.id}, body, err => {
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
