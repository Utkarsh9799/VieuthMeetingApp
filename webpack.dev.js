// In case the proxy doesn't work or you're getting CORS error
// Move this custom dev file to the following location:
// meetings-app/node_modules/react-scripts/config

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		host: 'localhost',
		port: 3000,
		open: true,
		historyApiFallback: true,
		proxy: {
			'/api': {
				target: 'http://fathomless-shelf-5846.herokuapp.com',
				secure: false,
			},
		},
	},
	devtool: 'inline-source-maps',
});
