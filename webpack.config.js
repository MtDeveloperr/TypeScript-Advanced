const path = require('path'); //node js in path modülünü import ettik

module.exports = {
    mode: 'development',//development modunda çalışacak. production modunda çalıştıgında dosyaları sıkıstırır ve daha hızlı çalışır
    entry : './src/app.ts',// bu dosya webpack in başlayacagı dosya. webpack buradan başlayıp bağımlılıkları çözerek bir dosya olusturacak
    output : {
        filename:'bundle.js',//önemli degil ne oldugu ama burada cashleme için bundle[contenthash].js yapabiliriz ve bu sayede her degisiklikte farkli bir bundle.js olusturur
        path: path.resolve(__dirname, 'dist'),//dirname ile şuanki dosyanın bulundugu klasörü alıyoruz ve dist klasörüne bundle.js dosyasını olusturuyoruz
        publicPath: '/dist/' //bu dosyaların nerede olacagını belirtiyoruz. bu durumda dist klasörüne olacak
    },
    devtool: 'inline-source-map',//bu sayede hata aldıgımızda hangi dosya ve hangi satırda hata aldıgımızı görebiliriz
    module:{ //burada webpack in ne yapıcagını belirtiyoruz. örneğin js dosyalarını babel ile çevirsin diye belirtiyoruz. Yukarıda sadece entry ve output belirttik
        rules:[
            {
                test: /\.ts$/,//bu dosyalara bakacak
                use: 'ts-loader',//bu dosyaları çevirecek
                exclude: /node_modules/ //node_modules klasörüne bakmasın
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']//webpack in hangi dosya uzantılarını çevirecegini belirtiyoruz
    },
    devServer: {
        static: [
          {
            directory: path.join(__dirname),//
          },
        ],
    },
}