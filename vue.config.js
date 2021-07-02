const ExtractTextPlugin = require('terser-webpack-plugin');

const webpack = require('webpack');
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// 是否为开发环境（生产环境或测试环境）
const isProduction = process.env.NODE_ENV == 'production';
console.log(process.env.NODE_ENV);
console.log(process)
// const isProduction = false

// 多线程执行
let HappyPack = require('happypack');
let os = require('os');
let happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// 本地环境是否需要使用cdn
const devNeedCdn = false;


// cdn链接npm
const cdn = {
	// cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
	externals: {
		vue: 'Vue',
		vuex: 'Vuex',
		'vue-router': 'VueRouter',
		// 'element-ui': 'ElementUI',
		"element-ui": "ELEMENT",
	},
	// cdn的css链接
	css: [
		'https://cdn.staticfile.org/element-ui/2.15.0/theme-chalk/index.min.css'
	],
	// cdn的js链接
	js: [
		'https://cdn.staticfile.org/vue/2.6.11/vue.min.js',
		'https://cdn.staticfile.org/vuex/3.6.2/vuex.min.js',
		'https://cdn.staticfile.org/vue-router/3.2.0/vue-router.min.js',
		"https://cdn.staticfile.org/element-ui/2.15.0/index.min.js"
	],
};

module.exports = {
	publicPath: '/',
	productionSourceMap: true, //生产去除map
	chainWebpack: config => {
		// ============压缩图片 start============
		config.module
			.rule('images')
			.use('image-webpack-loader')
			.loader('image-webpack-loader')
			.options(
				// { bypassOnDebug: true }
				{
					disable: true, // webpack@2.x and newer
					quality: '65-80',
					speed: 4,
				}
			)
			.end();
		// ============压缩图片 end============
		// console.log(config);
		// console.log(config.plugin('html'));
		// ============注入cdn start============
		config.plugin('html').tap(args => {
			// 生产环境或本地需要cdn时，才注入cdn
			if (isProduction || devNeedCdn) args[0].cdn = cdn;
			return args;
		});
		// ============注入cdn start============
		// 编译分析
		// config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
		// 	{
		// 		analyzerMode: 'static',
		// 	},
		// ]);
	},

	configureWebpack: config => {
		// 用cdn方式引入，则构建时要忽略相关资源
		if (isProduction || devNeedCdn) config.externals = cdn.externals;

		// 生产环境相关配置
		console.log(isProduction);
		// if (isProduction) {  
			// 代码压缩
			config.plugins.push(
				new ExtractTextPlugin({
					terserOptions: {
						//生产环境自动删除console
						compress: {
							// warnings: false, // 若打包错误，则注释这行
							drop_debugger: true,
							drop_console: true,
							pure_funcs: ['//console.log', 'console.log'],
							// pure_funcs: [],
						},
					},
					// sourceMap: false,
					parallel: true,
				}),
				
				// 多线程构建
				new HappyPack({
					id: 'babel',
					loaders: [
						{
							loader: 'babel-loader',
						},
					],
					threadPool: happyThreadPool,
				}),
				new HappyPack({
					id: 'css',
					// 如何处理 .css 文件，用法和 Loader 配置中一样
					loaders: ['css-loader'],
					// 使用共享进程池中的子进程去处理任务
					threadPool: happyThreadPool,
				})
			);

			// gzip压缩
			// gzip压缩  测试环境下
			// if (process.env.NODE_ENV === 'production'  process.env.VUE_APP_FLAG === 'test') {
			console.log('测试环境');
			const productionGzipExtensions = ['html', 'js', 'css'];
			config.plugins.push(
				new CompressionWebpackPlugin({
					filename: '[path].gz[query]',
					algorithm: 'gzip',
					test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
					threshold: 10240, // 只有大小大于该值的资源会被处理 10240
					minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
					deleteOriginalAssets: false, // 删除原文件
				})
			);
			// }
			// 	// 公共代码抽离
			config.optimization = {
				splitChunks: {
					// chunks: 'all',
					minSize: 500000,
					maxSize: 2048000,
					minChunks: 1,//分割之前，模块必须在块之间共享的最短时间
					maxAsyncRequests: 100,//按需加载时并行请求的最大数量
					maxInitialRequests: 200,//入口点的最大并行请求数。
					cacheGroups: {
						vendor: {
							chunks: 'all',
							test: /node_modules/,
							name: 'vendor',
							minChunks: 1,
							enforceSizeThreshold: 2048000,
							minSize: 0,
							priority: 100,
						},
						common: {
							chunks: 'all',
							test: /[\\/]src[\\/]js[\\/]/,
							name: 'common',
							minChunks: 2,
							minSize: 0,
							priority: 60,
						},
						styles: {
							name: 'styles',
							test: /\.(sa|sc|c)ss$/,
							chunks: 'all',
							enforce: true,
						},
						runtimeChunk: {
							name: 'manifest',
						},
					},
				},
				minimizer: [
					(compiler) => {
					  new ExtractTextPlugin({
						terserOptions: {
							//生产环境自动删除console
							compress: {
								// warnings: false, // 若打包错误，则注释这行
								drop_debugger: true,
								drop_console: true,
								pure_funcs: ['//console.log', 'console.log'],
								// pure_funcs: [],
							},
						},
						sourceMap: false,
						parallel: true,
					})
					  
					},
				  ],
			};
		// }
	},
};
