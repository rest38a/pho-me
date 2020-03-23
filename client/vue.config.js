module.exports = {
    devServer:{
        proxy:{
            '^/api':{
                target:'http://localhost:1337',
            }
        },
         disableHostCheck: true,
         public: 'http://pho-me.ru/',
    }
}