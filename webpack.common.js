const path = require("path");
module.exports = {
    entry: {
        main: ["babel-polyfill", "./src/index.js"],
        vendor: "./src/vendor.js"
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            },
            {
                //html loader
                // for any file ending in html
                // use html loader
                // it will come across src and try and require them in js
                // it will then be avaiable in html
                test: /\.html$/,
                exclude: /(node_modules|bower_components)/,
                use: ["html-loader"]
            },
            {
                //file loader
                // gets a file with any of extension below
                // it makes a copy of it
                // moves it to the dist folder with its name and extension
                // also adding in hash
                test: /\.(svg|png|jpg|gif)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "file-loader",
                    //name it the name html-loader finds, with same extension
                    //add a has in middle
                    //output path to dist/imgs
                    options: {
                        esModule: false,
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs"
                    } 
                }
            }
        ]
    }
};
