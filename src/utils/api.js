import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromAPI = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// import axios from "axios";

// const BASE_URL = "https://api.themoviedb.org/3";
// const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

// const headers = {
//   Authorization: "Bearer " + TMDB_TOKEN, // Note: Changed "bearer" to "Bearer"
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Origin": "*",
// };

// export const fetchDataFromAPI = async (url, params) => {
//   try {
//     const { data } = await axios.get(BASE_URL + url, {
//       headers,
//       params,
//     });
//     return data;
//   } catch (err) {
//     console.error("API Fetch Error:", {
//       url: BASE_URL + url,
//       errorMessage: err.message,
//       errorResponse: err.response?.data,
//       status: err.response?.status,
//     });
//     throw err; // Rethrow to allow caller to handle the error
//   }
// };
