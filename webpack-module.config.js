'use strict';

const {resolve} = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputPath = resolve('dist');

module.exports = (IS_DEV_SERVER) => {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          // We need to transpile Polymer itself and other ES6 code
          // exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [[
                'env',
                {
                  targets: {browsers: ['last 2 Chrome versions', 'Safari 10']},
                  debug: true
                }
              ]],
              plugins: [
                'babel-plugin-syntax-dynamic-import',
                ['transform-object-rest-spread', {useBuiltIns: true}]
              ]
            }
          }
        }
      ]
    },
    plugins: IS_DEV_SERVER ? [] : [
      new CleanWebpackPlugin([outputPath], {verbose: true})
    ]
  };
};