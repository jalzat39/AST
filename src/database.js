<<<<<<< HEAD
=======
/*const mongoose = require('mongoose');
const { mongodb} = require('./keys');

mongoose.set('useFindAndModify', false);
mongoose.connect(mongodb.URI, {
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));*/
  
>>>>>>> release
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

mongoose.connect("mongodb+srv://mono:mono123@cluster0-qfesm.mongodb.net/test?retryWrites=true", { useNewUrlParser: true })
      .then(db => console.log('db connected')).catch(err => console.log(err));