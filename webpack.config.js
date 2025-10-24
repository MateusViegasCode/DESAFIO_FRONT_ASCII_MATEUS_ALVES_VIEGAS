const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // Ponto de entrada
    entry: './src/script.ts',

    // Saída
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Limpa a pasta 'dist' antes de cada build
    },

    // Módulos
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },

    // PLUGINS
    plugins: [
        // Processa o index.html
        new HtmlWebpackPlugin({
            template: './src/index.html', // Arquivo de origem
            filename: 'index.html',       // Nome no destino (dist)
        }),

        // Processa o loja.html
        new HtmlWebpackPlugin({
            template: './src/loja.html',  // Arquivo de origem
            filename: 'loja.html',      // Nome no destino (dist)
        }),

        // Processa o carrinho.html
        new HtmlWebpackPlugin({
            template: './src/carrinho.html',  // Arquivo de origem
            filename: 'carrinho.html',      // Nome no destino (dist)
        }),

        // Copia CSS e Imagens
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/styles.css', to: 'styles.css' }, // Copia o CSS
                { from: 'src/images', to: 'images' }          // Copia a pasta inteira
            ],
        }),
    ],

    // SERVIDOR DE DESENVOLVIMENTO
    devServer: {
        static: './dist', // Diz ao servidor para "servir" a pasta 'dist'
        open: true,       // Abrir o navegador automaticamente
        hot: true,        // Recarregamento rápido
    },

    mode: 'development',
};