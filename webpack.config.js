const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;

module.exports ={
entry: resolve(__dirname,'src/index.js'),
output:{
   filename: 'bundle.js',
   clean: true,
   environment:{
    arrowFunction: false,
   }
},
devtool: NODE_ENV === 'production' ? 'hidden-source-map' : 'eval-source-map',

module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    },
    {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: "asset/resource",
      generator: {
        filename: "./image/[name][ext]",
      },
    },
  ]
  },

  mode : NODE_ENV === 'production' ? 'production' : 'development',

  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },

plugins:[
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/index.html"
  }),
new CopyWebpackPlugin({'patterns': [
  {from:'./src/image', to:'image'}
]}),
],

devServer: {
  compress: true,
  port: 9000,
  client:{
    logging: 'info',
  },
},

}