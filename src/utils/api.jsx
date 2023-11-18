import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
// const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmNkMWRjNmU3NDg5ZTE2NjIyNjUxNjkxNjBjMmQ1OSIsInN1YiI6IjY1NTY0MDZkN2YwNTQwMDBmZjM2M2ExMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MYr1ZmfXmiVZ0E7r0yIC5jNDjU8e7ehJcZYFcYChD_A";

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
       const {data} = await axios.get(BASE_URL + url,{
        headers,
        params
        })
        return data;
    } catch (error) {
        console.log("hello error")
        console.log(error);
        return error;
    }
};