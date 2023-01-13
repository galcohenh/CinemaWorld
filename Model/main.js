const MongoCRUD = require('./mongo-crud');

const mongoCRUD = new MongoCRUD('mongodb://localhost:27017', 'mydb', 'mycollection');
mongoCRUD.connect();