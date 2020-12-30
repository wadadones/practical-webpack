// OS依存にならないようにpathモジュールを読み込んでおく
const path = require('path')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'development',
  entry: { // どのファイルを読み始めるかを定義。ここにrequireが書いてあればそこからさらに読み込みを行う
    app: './src/js/app.js',
    search: './src/js/search.js'
  },
  output: { // 生成されたjsのファイル名と出力場所が定義されている。[name]はエントリの項目名に対応
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/js/' // ブラウザから、出力したファイルにアクセスするときのpath
  },
  module: {
    rules: [
      {
        test: /\.js$/, // ローダーの処理対象を定義
        include: path.resolve(__dirname, 'src/js'), // ローダーの処理対象となるディレクトリを定義
        use: [
          {
            loader: 'babel-loader', // 利用するローダー
            options: {
              presets: [['@babel/preset-env', {modules: false}]]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: [
          'style-loader', // HTMLにstyleタグを追加する(headに追加される)
          'css-loader',   // cssをモジュールに変換
          'sass-loader'   // sassをcssに変換
        ]
      },
      {
        // src/imagesの中にあるpng, jpg, gifは, url-loaderを使って変換してください
        test: /\.(png|jpg|gif)$/i,
        include: path.resolve(__dirname, 'src/images'),
        loader: 'url-loader',
        options: {
          // 8KB以上だったらDataUrlに変換せずに出力する
          limit: 8192,
          // DataUrlに変換しない場合の変換後の名前を決める
          name: '[name].[ext]',
          // 変換しない場合の画像の出力先
          outputPath: '../images/',
          publicPath: path => './images/' + path
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      // jqueryを全て変数$として利用できるようになる
      $: 'jquery'
    }),
    new BundleAnalyzerPlugin()
  ],
  devServer: {
    open: true, // サーバー起動時にブラウザを自動起動
    port: 9000,
    contentBase: './public' // ブラウザ起動時にどこがひらかれるか
  }

}
