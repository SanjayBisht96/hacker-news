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
    GMAIL_ACCOUNT_EMAIL_ADDRESS: process.env.GMAIL_ACCOUNT_EMAIL_ADDRESS,
    GMAIL_ACCOUNT_EMAIL_PASSWORD: process.env.GMAIL_ACCOUNT_EMAIL_PASSWORD,

  },
};


// next.config.js
module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};
