const path = require('path');
// eslint-disable-next-line no-unused-vars
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: { 
    main:'./src/main.jsx',
    styles: './src/styles/main.scss'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        ],
      },
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff|ttf|otf|eot|woff2|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000, //bytes,
              name: '[name].[ext]',
              outputPath: 'fonts/',
              fallback: require.resolve('file-loader'),
              publicPath: './fonts'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/index.html'),
          to: path.resolve(__dirname, 'dist')
        },
      ],
    }),
    new CleanWebpackPlugin({
      // dry: true, // remove this once you verify it removes the correct files
      // verbose: true,
      cleanOnceBeforeBuildPatterns: [
        './dist'
      ]
    }),
  ],
  resolve: { 
    modules: ['node_modules'],
    extensions: ['.js', '.css'],
  },
};