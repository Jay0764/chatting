const mongoose = require('mongoose')
module.exports = ()=>{
    function connect(){
        mongoose.connect('mongodb://localhost/local',{ useNewUrlParser: true } ,function(err){
            if(err){
                console.error('mongodb connection error', err)
            }
            console.log('mongodb connected')
        })
    }
    connect()
    mongoose.connection.on('disconnected', connect);
    require('./user.js')
}