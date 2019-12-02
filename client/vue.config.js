module.exports = {
    devServer:{
        proxy:{
            '*':{
                target:'http://localhost:1337',
            }
        },
        // disableHostCheck: true,
        // public: 'http://repairs.rest38.ru/',
    }
}