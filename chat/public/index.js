let socket = io()
//접속 되었을 때 실행
socket.on('connect', function(){
    //이름 입력받기
   let name = prompt('설정할 아이디:','')
   if(!name || name== undefined){
    let num = Math.floor((Math.random()* 10000))   
    name = '익명' + num
   }
   //서버에 새로운 유저가 왔다고 알림
   socket.emit('newUser', name)
   
})
socket.off('update')
socket.on('update', function(data){
    let chat = document.getElementById('chat')
    chat.innerHTML += `${data.message}<br>`
})
socket.off('toClient')
socket.on('toClient', (data)=>{
    let chat = document.getElementById('chat')
    chat.innerHTML += `<div class ='me'>${data.name}: ${data.message}</div><br>`
})
//전송 함수
function send(){
    //입력된 데이터 가져오기
    let message1 = document.getElementById('test').value
    //가져왔으니 데이터 빈칸으로 변경
    document.getElementById('test').value =''
    socket.emit('message2', {type: 'message', message: message1})
}
function press(event){
    if(event.keyCode==13){
        let message1 = document.getElementById('test').value
        document.getElementById('test').value =''
        socket.emit('message2', {type: 'message', message: message1})
    }
}
