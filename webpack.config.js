// In parent-app/webpack.config.js
const path = require('path');
const { DefinePlugin } = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ... other configuration settings
  entry: './src/index.js', // Ensure this file exists!
  mode: process.env.NODE_ENV || 'development', // Ensure Webpack uses the correct mode
  output: {
    publicPath: process.env.NODE_ENV === 'production' 
      ? 'http://parent-app-react-frontend.s3-website-ap-southeast-1.amazonaws.com'
      : 'auto',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        /* The following line to ask babel 
             to compile any file with extension
             .js */
        test: /\.js|\.jsx$/,

        /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,

        // To Use babel Loader
        loader:
          'babel-loader',
        options: {
          presets: [
            '@babel/preset-env' /* to transfer any advansed ES to ES5 */,
            '@babel/preset-react',
          ], // to compile react to ES5
        },
      },
      {
        test: /\.css$/, // Process CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Process images (including SVGs)
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new ModuleFederationPlugin({
      name: 'parentApp',
      remotes: {
        catalogApp: process.env.NODE_ENV === 'production'
          ? 'catalogApp@http://catalog-app-react-frontend.s3-website-ap-southeast-1.amazonaws.com/remoteEntry.js'
          : 'catalogApp@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^17.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^17.0.0' },
        '@mui/material': { singleton: true,  eager: true,},
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
  ],
};
