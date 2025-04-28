const axios = require("axios");

const getCarpetsFromUnsplash = async (query = "carpet") => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos", {
      params: {
        query: query,
        per_page: 10,
        client_id: process.env.UNSPLASH_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching carpets from Unsplash:", error);
    return [];
  }
};

module.exports = { getCarpetsFromUnsplash };
