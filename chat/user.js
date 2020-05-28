const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:{type:String, required:[true,'아이디를 입력하세요'],
            trim:true, match : [/^.{4,15}$/,'4~15자의 문자를 입력하세요']},
    password:{type:String, required:[true,'비밀번호를 입력하세요'],
            trim:true, match : [/^.{4,15}$/,'4~15자의 문자를 입력하세요']},
    nickname:{type:String, required:[true, '별명을 입력하세요'],
            trim:true, match : [/^.{4,15}$/,'4~15자의 문자를 입력하세요']},
})
module.exports = mongoose.model('User',userSchema)