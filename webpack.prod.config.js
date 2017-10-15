const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	context: path.resolve(__dirname, 'src', 'frontend'),
	entry: {
		main: './main',
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].js',
	},

	devtool: false,

	resolve: {
		modules: [
			'node_modules',
		],
	},

	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				include: path.resolve(__dirname, 'src', 'frontend', 'images'),
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images/',
							name: '[name]_[hash:8].[ext]',
							publicPath: '/',
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'static/font/',
							name: '[name]_[hash:8].[ext]',
							publicPath: '/',
						},
					},
				],
			},
			{
				test: /\.styl/,
				include: path.resolve(__dirname, 'src', 'frontend', 'styl'),
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								minimize: true,
							},
						},
						{
							loader: 'stylus-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				}),
			},
			{
				test: /\.coffee$/,
				use: [
					{
						loader: 'coffee-loader',
						options: { sourceMap: true },
					},
				],
			},
		],
	},

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: '"production"',
		}),

		new ExtractTextPlugin(path.join('css', 'main.css')),

		// new webpack.optimize.UglifyJsPlugin({
		//   compress: {
		//     drop_console: true,
		//     unsafe: true,
		//   },
		// }),
	],
};

module.exports = config;
