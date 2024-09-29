const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./src/index.js", // Adjust to your actual entry file
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        fallback: {
            stream: require.resolve("stream-browserify"),
            assert: require.resolve("assert/"),
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            os: require.resolve("os-browserify/browser"),
            url: require.resolve("url/"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            // Other loaders can be added here
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ],
    devtool: "source-map", // Optional for better debugging
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
    },
};
