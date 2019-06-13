var webpack = require('webpack');
var path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var BUILD_DIR = path.resolve(__dirname, 'assets');
var APP_DIR = path.resolve(__dirname, 'src');
var isProduction = process.env.NODE_ENV === 'production';

var config = {
    mode: 'development',
    watch: true,
    devtool: 'source-map',
    watchOptions: {
        ignored: /node_modules/,
        poll: true
    },
    entry: {
        'public/admin/login' :
        APP_DIR + '/client/adminLogin/index'
        ,
        'public/public':
        APP_DIR + '/client/public/index'
        ,
        'admin/admin':
        APP_DIR + '/client/admin/index'
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },
    module : {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin()
    ],
};

module.exports = config;