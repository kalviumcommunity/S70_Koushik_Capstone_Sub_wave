const corsOptions = {
    origin: [
        'http://localhost:5173',  // Local development
        'https://s70-koushik-capstone-sub-wave.netlify.app', // Your Netlify domain
        process.env.FRONTEND_URL // Any additional frontend URL from env
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = corsOptions; 