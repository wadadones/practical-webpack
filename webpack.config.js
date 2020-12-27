// OS依存にならないようにpathモジュールを読み込んでおく
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/js/app.js', // どのファイルを読み始めるかを定義。ここにrequireが書いてあればそこからさらに読み込みを行う
  output: { // 生成されたjsのファイル名と出力場所が定義されている
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js')
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
      }
    ]
  }
}
