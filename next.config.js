module.exports = {
  env: {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    API_ROOT: process.env.API_ROOT,
    DATABASE_URL: process.env.DATABASE_URL,
    CRYPTR_SECRET_KEY: process.env.CRYPTR_SECRET_KEY,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,
    GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
    GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  },
};
