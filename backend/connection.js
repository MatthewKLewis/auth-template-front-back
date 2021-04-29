const mongoose = require("mongoose");

mongoose.Promise = Promise;

//Needs to be changed on deployment
let mongoURI = process.env.DB_URL;

if (process.env.NODE_ENV === "production") {
  //mongoURI = process.env.DB_URL;
} else {
  //mongoURI = "mongodb://localhost/AUTH";
}

mongoose
  .connect(mongoURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(instance =>
    console.log(`Connected to db`)
  )
  .catch(err => console.log("Connection Failed.", err));

module.exports = mongoose;