/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const less = require("next-with-less");

const nextConfig = {}

const redirects = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            },
        ];
    },
};

module.exports = withPlugins([
    [less, {
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
    }],
    [redirects]
], nextConfig);
