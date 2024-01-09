/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

const nextConfig = withLess({
    lessLoaderOptions: {
        /* ... */
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
});

module.exports = nextConfig
