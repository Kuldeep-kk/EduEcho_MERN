/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        domains: ["res.cloudinary.com"]
    },
    webpack: (config, { isServer }) => {
        // Add the Handlebars loader
        config.module.rules.push({
            test: /\.handlebars$/,
            loader: "handlebars-loader",
        });

        // Return the modified config
        return config;
    },
};

module.exports = nextConfig;
