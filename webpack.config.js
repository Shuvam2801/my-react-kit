const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
        tailwind: './src/tailwind-entry.js',
        lib: './src/lib.js',          // For library usage
        //bootstrap: './src/bootstrap-entry.js',
        components: './src/components-entry.js',
        types: './src/types.d.ts'
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/',
        library: '@qinvent/test-react-kit',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this',
        
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              },
            },
          },
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ],
          },
          {
            test: /\.css$/, // Add this rule to handle .css files
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader', // Process CSS
            ],
          },
          {
            test: /\.(png|jpg|woff|woff2|eot|ttf|)$/, // to import images and fonts
            type: 'asset/resource',
          },
          {
            test: /\.svg$/, // Add a rule to handle SVG files
            type: 'asset/resource',
            generator: {
              filename: 'assets/[name][ext]', // Output SVG files to assets folder
            },
          },
        ],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'styles/[name].css',
        }),
        new CopyWebpackPlugin({
          patterns: [
            { from: 'src/assets/icons.svg', to: 'assets/icons.svg' }, // Copy sprite file to output directory
          ],
        }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './public/index.html',
          chunks: ['main', 'components'],
        }),
        /* new HtmlWebpackPlugin({
          filename: 'tailwind.html',
          template: './public/tailwind.html',
          chunks: ['tailwind'],
        }),
        new HtmlWebpackPlugin({
          filename: 'bootstrap.html',
          template: './public/bootstrap.html',
          chunks: ['bootstrap'],
        }), */
      ],
      devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        open: true, // Opens the browser after server is started
        hot: true, // Enables Hot Module Replacement
        watchFiles: {
          paths: ['src/**/*'],
          options: {
            usePolling: true,
          },
        },
      },
      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      mode: 'development',
      
    };
    