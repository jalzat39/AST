/*const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.set('useFindAndModify', false);
mongoose.connect(mongodb.URI, {
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));*/
  
const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://admin:84f5EG0fILLCIydq@cluster0-youmh.mongodb.net/test?retryWrites=true"
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
  if(err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
  }
    else {
      console.log('Connected...');
      const db = client.db("test").collection("devices", function (err, collection) {
        collection.find().toArray(function(err, res) {
                     callback(res)});
        })
   // perform actions on the collection object
    client.close();
    }
});