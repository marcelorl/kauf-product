const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  productName: String,
  retailerUrl: String,
  productBrand: String,
  reducedPrice: {
    amount: Number,
    currencyCode: String
  },
  originalPrice: {
    amount: Number,
    currencyCode: String
  },
  productImagePointer: {
    itemName: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('offer', OfferSchema);
