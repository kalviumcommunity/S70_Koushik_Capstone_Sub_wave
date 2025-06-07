import axios from 'axios';

const api = axios.create({
    baseURL: 'https://s70-koushik-capstone-sub-wave.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api; 