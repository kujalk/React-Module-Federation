// In parent-app/webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ... other configuration settings
  entry: './src/index.js', // Ensure this file exists!
  output: {
    publicPath: 'auto',
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
    new ModuleFederationPlugin({
      name: 'parentApp',
      remotes: {
        catalogApp: 'catalogApp@http://localhost:3001/remoteEntry.js',
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
