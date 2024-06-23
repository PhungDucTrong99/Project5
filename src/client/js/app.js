const { fetchData } = require("./fetchData");
const { convertDateToGetTime } = require("./convertDateToGetTime");

document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit");
  const resultContainer = document.getElementById("result");
  const errorContainer = document.querySelector(".error");

  const createTripElement = (data, date, location) => {
    // Output
    const itemsDiv = document.createElement("div");
    itemsDiv.className = "items";

    const img = document.createElement("img");
    img.src = data.image;
    img.alt = "";

    const destination = document.createElement("h1");
    //convert locationConvert
    const locationConvert = location.replaceAll("+", " ");
    console.log("location", locationConvert);
    destination.textContent = `My trip to ${locationConvert}`;

    const dateTrips = document.createElement("h2");
    dateTrips.textContent = `Departing: ${date}`;

    const countDown = document.createElement("p");
    countDown.textContent = "Your trip is 2 days away";

    const descriptionWeather = document.createElement("p");
    descriptionWeather.textContent = `Weather is expected to be: ${data?.weather?.description}`;

    const currentWeather = document.createElement("p");
    currentWeather.textContent = `Temperature is expected to be: ${data?.temp}°C`;

    const button = document.createElement("button");
    button.className = "delete";
    button.textContent = "Delete";

    itemsDiv.append(
      img,
      destination,
      dateTrips,
      countDown,
      descriptionWeather,
      currentWeather,
      button
    );

    return itemsDiv;
  };

  // Delete event
  const handleDelete = (event) => {
    if (event.target.classList.contains("delete")) {
      event.target.parentNode.remove();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    errorContainer.textContent = "";
    submit.disabled = true;

    // Form Input Variables
    const search = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const location = search.replaceAll(" ", "+");

    // Convert time to milliseconds
    const currentTime = await convertDateToGetTime();
    const selectedTime = await convertDateToGetTime(date);

    // Validation - Required Input Fields
    if (!search || !date) {
      alert("Can not be blank");
      console.log("is blank");
      // errorContainer.textContent = "Can not be blank";
      submit.disabled = false;
      return;
    }

    // Validation date if current time > selected time
    if (currentTime > selectedTime) {
      try {
        // Fetch APIs
        const baseURL = "http://localhost:8080/";
        const data = await fetchData(`${baseURL}`, {
          location,
          date,
        });
        if (data) {
          const tripElement = createTripElement(data, date, location);
          resultContainer.appendChild(tripElement);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        submit.disabled = false;
      }
    } else {
      // Error The current time is greater than the selected time.
      errorContainer.textContent = "Start Time Cannot Be Earlier Than Today";
      submit.disabled = false;
    }
  };

  submit.addEventListener("click", handleSubmit);
  resultContainer.addEventListener("click", handleDelete);
});
