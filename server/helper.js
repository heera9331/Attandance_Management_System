const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'your-database-name';

// Connect to the MongoDB server
mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to the MongoDB server');

    // List all collections in the database
    const collections = mongoose.connection.db.listCollections().toArray();
    mongoose.connection.db
    return collections;
  })
  .then((collections) => {
    console.log('Collections:');
    collections.forEach((collection) => {
      console.log(collection.name);
    });

    // Close the connection
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error occurred while connecting to MongoDB:', err);
  });
