//Importing...
const express = require("express");
const path = require('path');
const dotenv = require('dotenv')

//Configuring...
const User = require("./user.model");
const app = express();
app.use(express.json());

app.set("json spaces", 2);

app.get('/', (req, res) => {
  res.redirect('/documentation')
})

app.get("/documentation", (req, res) => {
  res.sendFile(path.join(__dirname + '/documentation.html'), (err)=> {
    if (err) console.log(err);
  });
});

app.get("/user/:id", (req, res) => {
  User.findById({ _id: req.params.id }).then((User) => {
    res.json(User);
  });
});

app.post("/user/create", (req, res) => {
  var newUser = new User({
    "Name": req.body.name,
    "Password": "1245",
  })

  newUser.save((err) => {
    if (err) throw err;
    else res.send('User Created');
  });
});

app.put("/user/update/:id", (req, res) => {
  User.findById({ _id: req.params.id }).then((User) => {
    User["Official Name"] = req.body.name
    User.save((err) => {
      if (err) throw err;
      else res.send('User Created');
    });
  });
});

app.delete("/user/delete/:id", (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id }).then(() => {
    res.send("User Deleted");
  });
});

app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () => {
  console.log(`Listening on Port: ${app.get('port')}`);
});