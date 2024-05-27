const express = require("express");
const app = express();
const session = require("express-session");
const fs = require("fs");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/disclaimer", (req, res) => {
  res.render("disclaimer");
});
app.get("/createAnAccount", (req, res) => {
  res.render("createAnAccount");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/createAnAccount", (req, res) => {
  const { username, password } = req.body;
  const userString = `${username}:${password}\n`;
  const filePath = path.join(__dirname, "login.txt");

  if (!username || !password) {
    return res.render("createAnAccount", {
      message: "Username and password are required",
    });
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading login.txt:", err);
      return res.render("createAnAccount", {
        message: "An error occurred while creating your account.",
      });
    }

    if (data.includes(`${username}:`)) {
      return res.render("createAnAccount", {
        message: "Username already exists",
      });
    }

    fs.appendFile(filePath, userString, (err) => {
      if (err) {
        console.error("Error appending to login.txt:", err);
        return res.render("createAnAccount", {
          message: "An error occurred while creating your account.",
        });
      }
      res.render("createAnAccount", {
        message: "Account created successfully",
      });
    });
  });
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const filePath = path.join(__dirname, "login.txt");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading login.txt:", err);
      return res.status(500).send("Error logging in.");
    }

    const users = data.split("\n");
    const userExists = users.some((user) => user === `${username}:${password}`);

    if (userExists) {
      req.session.username = req.body.username;
      res.redirect("giveaway");
    } else {
      res.render("login", { message: "Invalid username or password" });
    }
  });
});
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error logging out.");
    }
    res.render("logout");
  });
});
app.get("/catCare", (req, res) => {
  res.render("catCare");
});
app.get("/dogCare", (req, res) => {
  res.render("dogCare");
});
app.get("/giveaway", (req, res) => {
  res.render("giveaway", { message: req.session.username });
});
app.get("/findPets", (req, res) => {
  res.render("findPets");
});
app.post("/findPets", (req, res) => {
  const { species, breed, ageCategory, gender, social } = req.body;
  const filePath = path.join(__dirname, "pets.txt");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading pets.txt:", err);
      return res.status(500).send("Error reading pet data file.");
    }
    const petsData = data.split("\n");
    const filteredPets = petsData.filter((line) => {
      const parts = line.split(":");
      return (
        (!species || parts[0].toLowerCase() === species.toLowerCase()) &&
        (!breed ||
          breed === "mixedBreed" ||
          parts[1].toLowerCase().includes(breed.toLowerCase())) &&
        (ageCategory === "No preference" || parts[2] === ageCategory) &&
        (gender === "No preference" || parts[3] === gender) &&
        (!social || parts[4] === social)
      );
    });
    res.render("filteredPets", { pets: filteredPets });
  });
});

app.get("/contactUs", (req, res) => {
  res.render("contactUs");
});
app.post("/registerPet", (req, res) => {
  const { species, breed, ageCategory, gender, social, more, name, email } =
    req.body;
  const petString = `${species}:${breed}:${ageCategory}:${gender}:${social}:${more}:${name}:${email}\n`;
  const filePath = path.join(__dirname, "pets.txt");

  fs.appendFile(filePath, petString, (err) => {
    if (err) {
      console.error("Failed to write pet data:", err);
      return res.status(500).send("Failed to register pet.");
    }
    res.render("giveaway", { message: "Pet registered successfully." });
  });
});

const port = process.env.PORT || 5023;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
