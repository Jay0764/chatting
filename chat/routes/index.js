const express = require('express')
const router = express.Router()
const User = require('../user')

const app = express()

router.get('/', (req,res) => res.render('../views/index.ejs'))
router.get('/login', (req,res) => res.render('login', {page: "login"}))
router.post('/loginAction', (req,res)=>{
    let id = req.body.id
    let password = req.body.password
    User.findOne({name: id, password: password}).exec((err,result)=>{
        if(result){
            res.redirect(307,'/chat')
        } else{
            res.send('login failed')
        }
    })
    
})
router.get('/signup', (req,res) => res.render('signup', {page: "signup"}))
router.post('/signupAction', (req,res)=>{
    let user = new User()
    user.name = req.body.id
    user.password = req.body.password
    user.nickname = req.body.nickname
    user.save().then(()=>{        
        res.status(200).render('success')
    })
})


module.exports = router