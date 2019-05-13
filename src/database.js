//const mongoose = require('mongoose');
//const { mongodb } = require('./keys');

//mongoose.set('useFindAndModify', false);
//mongoose.connect(mongodb.URI, {
  //useNewUrlParser: true
//})
  //.then(db => console.log('DB is connected'))
  //.catch(err => console.log(err));

  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://admin:2j1JHQFU1Od729N5@cluster0-youmh.mongodb.net/test?retryWrites=true";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });