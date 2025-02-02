// webpack.config.js in your catalog-app (child)
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // your entry file
  mode: 'development', // or 'production'
  output: {
    publicPath: process.env.NODE_ENV === 'production' 
      ? 'http://catalog-app-react-frontend.s3-website-ap-southeast-1.amazonaws.com'
      : 'auto',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    port: 3001,
    static: {
      directory: path.join(__dirname, 'build'),
    },
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'catalogApp',
      filename: 'remoteEntry.js', // This tells webpack to output remoteEntry.js
      exposes: {
        './Catalog': './src/Catalog',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^17.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^17.0.0' },
        '@mui/material': { singleton: true, eager: true, },
      },
    }),
    new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: './index.html',
          favicon: './public/favicon.ico'
        }),
    // other plugins...
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match both .js and .jsx files
        exclude: /node_modules/, // Ignore node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
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
  resolve: {
    // Prefer 'module' or 'main' fields over 'browser'
    mainFields: ['module', 'main'],
    extensions: ['.js', '.jsx', '.json'],
    // Optionally, add alias configuration if needed
    alias: {
      // e.g., 'react': path.resolve(__dirname, 'node_modules/react')
    },
  },
};
