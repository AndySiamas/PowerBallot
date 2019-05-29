module.exports = {
    entry: __dirname + '/client/ui/index.jsx',
    module: {
    rules: [
        { 
            test: [/\.jsx$/],
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['@babel/preset-env', '@babel/preset-react'],	
            }
        },
        {
            test: /\.(svg|png|ogg|mp3|wav|mpe?g|ttf)$/i,
            use: 'file-loader'
        }
    ]
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public'
    }
};