import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const port = process.env.PORT || 3000;

export default async () => ({
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  devServer: {
    host: 'localhost',
    historyApiFallback: true,
    port,
    open: true,
    hot: true,
    proxy: {
      '/api': 'http://localhost:5555',
      '/documentation': 'http://localhost:5555',
      '/auth': 'http://localhost:5555',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      BASENAME: JSON.stringify('/'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: { '@reset-import': false },
              },
            },
          },
        ],
      },
    ],
  },
});
