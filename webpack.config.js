// module.exports = {
//     entry:'./src/index.js',
//     module:{
//        loaders:[
//            {
//               test:/\.js$/,
//               loader:'babel-loader',
//               exclude:/node_modules/,
//               query: {
//                 presets: ['es2016', 'react']
//               }
//            },
//            {
//                test:/\.jsx$/,
//                loader:'babel-loader',
//                exclude:/node_modules/,
//                query: {
//                 presets: ['es2016', 'react']
//               }
//             },
//             {
//                 test:/\.es6$/,
//                 loader:'babel-loader',
//                 exclude:/node_modules/,
//                 query: {
//                     presets: ['es2016', 'react']
//                   }
//              }
//        ]
//     },
//     output:{
//        filename:'bundle.js',
//        path:__dirname + '/public'
//     }
// };


module.exports = {
    module: {
      rules: [
        { test: /\.js$/, use: 'babel-loader' },
        { test: /\.jsx$/, use: 'babel-loader' },
        { test: /\.css$/, use: 'css-loader' }
      ]
    },
    output:{
       filename:'bundle.js',
       path:__dirname + '/public'
    }
  };