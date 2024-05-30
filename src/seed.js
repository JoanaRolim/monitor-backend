const mongoose = require('mongoose');
const Site = require('./models/Site');

mongoose.connect('mongodb://localhost:27017/monitor-de-sites', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const sites = [
  { url: 'https://www.exemplo.com', availability: true, responseTime: 123 },
  { url: 'https://www.google.com', availability: true, responseTime: 234 },
  { url: 'https://www.facebook.com', availability: false, responseTime: 345 },
];

Site.deleteMany({})
  .then(() => Site.insertMany(sites))
  .then(() => {
    console.log('Dados inseridos');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Erro ao inserir dados', error);
    mongoose.connection.close();
  });
