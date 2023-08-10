import axios from 'axios'

// const BASE_URL = 'http://localhost:3500';
const BASE_URL = 'https://scribblesphere-backend.vercel.app';

export default axios.create({
    baseURL: BASE_URL
})
