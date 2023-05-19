const express = require("express");
var nunjucks = require("nunjucks");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();

nunjucks.configure("views", {
  express: app,
  autoescape: true,
  watch: true,
});
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "public")));

getKitty = async () => {
  const response = await axios.get("https://api.thecatapi.com/v1/images/search");
  return response.data[0]
};


app.get("/", async (req, res) => {
  const kitty = await getKitty();
  res.render("index", {
    kittyImageUrl: kitty.url
  })
});

app.get('*', function(req, res){
  res.status(404).render("404");
});

app.listen(PORT, () => console.log(`Started server on port: ${PORT}`));
