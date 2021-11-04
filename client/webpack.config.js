const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);

module.exports = {
	mode: `production`,
	entry: {
		main: path.resolve(__dirname, `src/index.js`),
	},
	output: {
		path: path.resolve(__dirname, `../api/dist`),
		filename: `[name].js`,
		clean: true,
	},

	//loaders
	module: {
		rules: [{ test: /\.css$/, use: [`style-loader`, `css-loader`] }],
	},

	//plugins
	plugins: [
		new HtmlWebpackPlugin({
			title: `URL Shortener`,
			filename: `index.html`,
			template: path.resolve(__dirname, `./src/template.html`),
		}),
	],
};
