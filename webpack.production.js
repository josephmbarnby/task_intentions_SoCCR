const path = require('path');

module.exports = () => {
  return {
    name: 'production',
    mode: 'production',
    target: ['web', 'es5'],
    entry: {
      index: './src/task/index.tsx'
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-typescript',
                '@babel/preset-react',
                '@babel/preset-env',
              ],
            }
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
          ],
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
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
  }
};
