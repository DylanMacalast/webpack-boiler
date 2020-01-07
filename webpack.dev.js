const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// including webpack.common.js
module.exports = merge(common, {
    mode: "development",
    output: {
        //[contentHash] used to cash bust the main.js file each time code updates
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    // plugins
    plugins: [
        // we give it a template, it uses this, builds a file 
        // this allows the script tags to change with name of output js file
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        })
    ],
    module: {
        rules: [
            {
                // SCSS/SASS
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    "style-loader", //3. injects styles into dom
                    "css-loader", //2. turns css into commonjs
                    "sass-loader" //1. turns sass into css
                ]
            }
        ]
    }
});
