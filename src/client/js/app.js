const { fetchData } = require("./fetchData");
const { convertDateToGetTime } = require("./convertDateToGetTime");

document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit");
  const resultContainer = document.getElementById("result");
  const errorContainer = document.querySelector(".error");

  const createTripElement = (data, date, location) => {
    const itemsDiv = document.createElement("div");
    itemsDiv.className = "items";

    const img = document.createElement("img");
    img.src = data.image;
    img.alt = "";

    const h1 = document.createElement("h1");
    const locationConvert = location.replaceAll("+", " ");
    console.log("location", locationConvert);
    h1.textContent = `My trip to ${locationConvert}`;

    const h2 = document.createElement("h2");
    h2.textContent = `Departing: ${date}`;

    const p1 = document.createElement("p");
    p1.textContent = "Your trip is 2 days away";

    const p2 = document.createElement("p");
    p2.textContent = `Weather is expected to be: ${data?.weather?.description}`;

    const p3 = document.createElement("p");
    p3.textContent = `Temperature is expected to be: ${data?.temp}°C`;

    const button = document.createElement("button");
    button.className = "delete";
    button.textContent = "Delete";

    itemsDiv.append(img, h1, h2, p1, p2, p3, button);

    return itemsDiv;
  };

  const handleDelete = (event) => {
    if (event.target.classList.contains("delete")) {
      event.target.parentNode.remove();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    errorContainer.textContent = "";
    submit.disabled = true;

    const search = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const location = search.replaceAll(" ", "+");

    const currentTime = await convertDateToGetTime();
    const selectedTime = await convertDateToGetTime(date);

    if (!search || !date) {
      alert("Can not be blank");
      console.log("is blank");
      // errorContainer.textContent = "Can not be blank";
      submit.disabled = false;
      return;
    }

    if (currentTime > selectedTime) {
      try {
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
      errorContainer.textContent = "Start Time Cannot Be Earlier Than Today";
      submit.disabled = false;
    }
  };

  submit.addEventListener("click", handleSubmit);
  resultContainer.addEventListener("click", handleDelete);
});
