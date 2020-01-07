const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin= require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//inclduing webpack.common.js
module.exports = merge(common, {
    mode: "production",
    output: {
        //[contentHash] used to cash bust the main.js file each time code updates
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    //adding optimization to use the minify css plugin
    //when we use this it overwrites what just having mode: production does (minify js)
    // therefore we now have to tell it to minify js too
    optimization: {
        minimizer: [
            new  OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
            // this plugin can also be used to minify html aswell as build a file
            new HtmlWebpackPlugin({
            template: "./src/template.html",
            // what options we want to minify
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
            })
        ]
    },
    // cleanwebpack plugin stops the build from producing to many output files as we are using the hash  
    // to cache bust the js files in production
    plugins: [
        // in dev webpack we use style loader which loads all styles thorugh js injecting them  
        // in production we want to use this plugin instead
        // This plugin extracts css and puts it into a new file within dist for production
        new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css"
        }),
        new CleanWebpackPlugin()
    ],

    module: {
        rules: [
            {
                // we no longer want to use style loader we want to use minicssextractplugin
                // as we are now in production webpack
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    MiniCssExtractPlugin.loader, // 3. Extract Css into files
                    "css-loader", //2. turns css into commonjs
                    "sass-loader" //1. turns sass into css
                ]
            }
        ]
    }
});
