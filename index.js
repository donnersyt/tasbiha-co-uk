const express = require("express");
var nunjucks = require("nunjucks");
const path = require("path");
const axios = require("axios");
const { get } = require("http");
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

getUrl = async (req) => {
  return req.protocol + '://' + req.get('host')
}

app.get("/", async (req, res) => {
  const thisUrl = await getUrl(req);
  const kitty = await getKitty();
  res.render("index", {
    thisUrl: thisUrl,
    kittyImageUrl: kitty.url
  })
});

app.get(/.*/, async function (req, res) {
  console.log(await getUrl(req));
  res.status(404).render("404");
});

app.listen(PORT, () => console.log(`Started server on port: ${PORT}`));
