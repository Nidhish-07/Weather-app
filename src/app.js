const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { log } = require("console");

const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();
const port=process.env.PORT|| 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Nidhish Chauhan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nidhish Chauhan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Nidhish Chauhan",
  });
});

//using weather and geoCode API 
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address given",
    });
  }
  // console.log(req.query);

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,

          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  console.log(req.query.search);
  res.send({ products: 11 });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: 404,
    name: "Nidhish Chauhan",
    errorMessage: "No help found ",
  });
});
app.get("/*", (req, res) => {
  res.render("error", {
    title: 404,
    name: "Nidhish Chauhan",
    errorMessage: "No page found ",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000.");
});
