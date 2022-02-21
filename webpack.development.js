const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  name: 'development',
  mode: 'development',
  entry: {
    index: './src/task/timeline.tsx',
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/task/index.html',
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        router: () => 'http://localhost:8000',
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true,
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@task': path.resolve(__dirname, 'src/task/'),
      '@lib': path.resolve(__dirname, 'src/task/lib'),
      '@classes': path.resolve(__dirname, 'src/task/lib/classes'),
      '@components': path.resolve(__dirname, 'src/task/lib/view/components'),
      '@screens': path.resolve(__dirname, 'src/task/lib/view/screens'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
