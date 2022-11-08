const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/review',{ useNewUrlParser: true });

const con = mongoose.connection;

con.once('open',function(){
    console.log('connection has completed')
})

