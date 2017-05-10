const data = require('./seed.json');
const seeder = require('mongoose-seed');

seeder.connect('mongodb://localhost/kauf', () => {
  seeder.loadModels([
    'src/components/category/model.js',
    'src/Components/offer/model.js'
  ]);

  seeder.clearModels(['category', 'offer'], () => {
    seeder.populateModels(data, () => {
      //seeder.disconnect();
    })
  });
});
