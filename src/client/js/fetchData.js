const axios = require("axios");

const fetchData = async (url = "", { location = "", date = "" } = {}) => {
  try {
    const response = await axios.post(
      url,
      { location, date },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

module.exports = {
  fetchData,
};
