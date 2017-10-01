const webpack = require('webpack');
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  context: path.resolve(__dirname, 'src', 'frontend'),
  entry: {
    main: './main',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },

  watch: NODE_ENV === 'development',

  watchOptions: {
    aggregateTimeout: 100,
  },

  devtool: NODE_ENV === 'development' ? 'inline-cheap-module-source-map' : false,

  devServer: {
    host: 'localhost',
    port: '8080',
    proxy: {
      '*': 'http://localhost:3000',
    },
    hot: true,
  },

  resolve: {
    modules: [
      'node_modules',
    ],
  },

  module: {
    rules: [
      {
        test: /\.styl/,
        include: path.resolve(__dirname, 'src', 'frontend', 'styl'),
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: [
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         sourceMap: true,
        //         minimize: true,
        //       },
        //     },
        //     {
        //       loader: 'stylus-loader',
        //       options: {
        //         sourceMap: true,
        //       },
        //     },
        //   ],
        // }),

        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        include: path.resolve(__dirname, 'src', 'frontend', 'images'),
        loaders: [
          'file-loader', {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),

    // new ExtractTextPlugin(path.join('css', 'main.css')),

    new webpack.HotModuleReplacementPlugin(),
  ],
};

if (NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
        unsafe: true,
      },
    }),
  );
}

module.exports = config;
