module.exports = {
    apps: [
        {
            name: "v-portfolio-api",
            script: "./index.js",
            env: {
                NODE_ENV: "production",
                PORT: 5000,
            },
        },
    ],
};
