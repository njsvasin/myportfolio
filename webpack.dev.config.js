const webpack = require('webpack');
const path = require('path');

const config = {
	context: path.resolve(__dirname, 'src', 'frontend'),
	entry: {
		'main-head': './main-head',
		main: './main',
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].js',
	},

	watch: true,

	watchOptions: {
		aggregateTimeout: 100,
	},

	devtool: 'inline-cheap-module-source-map',

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
			path.join('src', 'frontend', 'vendor'),
		],
		alias: {
			canvasrenderer: 'easy-pie-chart/renderer/canvas',
			easypiechart: 'easy-pie-chart/easypiechart',
			wow: 'wow/wow.coffee',
		},
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
			NODE_ENV: '"development"',
		}),

		new webpack.HotModuleReplacementPlugin(),
	],
};

module.exports = config;
