const mongoose = require('mongoose');

try {
  mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('MongoDB connection established!');
} catch (error) {
  console.log(error.message);
}
