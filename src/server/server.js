const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
let API_KEY_W = "0ba8e9ce3ee049969ff70a86afe9f49f"; // Weatherbit API Key
let API_KEY_P = "44462151-85b0599cfaaf315d3676d2759"; // Pixabay API Key

app.use(cors());
app.use(express.static("dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  const { location, date } = req.body;

  try {
    const geonamesData = await fetchGeonamesData(location);
    const weatherData = await fetchWeatherData(geonamesData, date);
    const pixabayData = await fetchPixabayData(location);
    const sendData = {
      lat: geonamesData?.geonames[0]?.lat,
      lon: geonamesData?.geonames[0]?.lng,
      weather: weatherData?.data[0].weather,
      temp: weatherData?.data[0]?.temp,
      image: pixabayData?.hits[0]?.largeImageURL,
    };
    res.send(sendData);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

const fetchGeonamesData = async (location) => {
  const baseURL = "http://api.geonames.org/searchJSON?q=";
  const url = `${baseURL}${location}&maxRows=1&username=buiduy057`;
  const response = await axios.get(url, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("data", response.data);
  return response?.data;
};

const fetchWeatherData = async (geonamesData, date) => {
  const { lat, lng } = geonamesData.geonames[0];
  const baseURL = "https://api.weatherbit.io/v2.0/current?lat=";
  const url = `${baseURL}${lat}&lon=${lng}&key=${API_KEY_W}&include=minutely&start_date=${date}`;
  const response = await axios.get(url, {
    headers: { "Content-Type": "application/json" },
  });
  return response?.data;
};

const fetchPixabayData = async (search) => {
  const baseURL = "https://pixabay.com/api/?key=";
  const url = `${baseURL}${API_KEY_P}&q=${search}&image_type=photo`;
  const response = await axios.get(url, {
    headers: { "Content-Type": "application/json" },
  });
  return response?.data;
};

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
