const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
const db = require('./db')
app.use(express.static(__dirname + '/public'));
//routes
const indexRoute = require('./routes/index')

//뷰엔진 설정
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"))
app.engine('html', require('ejs').renderFile);
db()
const server = app.listen(PORT)
const io = require('socket.io').listen(server)
app.use('/', indexRoute)

app.post('/chat', (req,res)=>{
    res.render('../public/chat.html')    
})
io.sockets.on('connect', function(socket){
       
    socket.on('newUser', function(name){
        //새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌
        console.log(name+ '님이 접속하였습니다.')
        //소켓에 이름 저장해두기
        socket.name = name;
        //모든 소켓에게 전송
        io.sockets.emit('update', {type: 'connect', name:'SERVER', message: name+'님이 접속하였습니다.'})
    })
// 전송한 메세지 받기
    
    socket.on('message2', function(data){
       //받은 데이터에 누가 보냈는지 이름을 추가
       data.name = socket.name;
       console.log(data)
       //보낸 사람을 제외한 나머지 유저에게 메세지 전송
       io.sockets.emit('toClient',data)
    })
    socket.on('disconnect', function () {
        socket.removeAllListeners();
       
    });
})