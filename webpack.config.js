const path = require("path");

module.exports = (paths) => ({
  entry: './src/index.tsx', // Arquivo de entrada principal do React
  output: {
    path: path.resolve(__dirname, paths.dest), // Caminho de saída
    filename: "bundle.js", // Nome do arquivo gerado
  },
  mode: "development", // Modo de desenvolvimento
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // Resolve arquivos .ts, .tsx, .js e .jsx
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Testa arquivos .ts e .tsx
        exclude: /node_modules/, // Exclui node_modules
        use: {
          loader: "ts-loader", // Usa ts-loader para processar TypeScript e JSX
        },
      },
      {
        test: /\.js$/, // Testa arquivos .js
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Usa Babel para processar JavaScript
          options: {
            presets: ["@babel/preset-env"], // Usa o preset-env do Babel para compatibilidade de JS
          },
        },
      },
    ],
  },
  devtool: "source-map", // Gera um source map para facilitar o debug
});
