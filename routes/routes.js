const { Router } = require('express')
const User = require('../models/User')
const router = Router()

router.get('/',(req, res)=> {
    res.render('pages/index.ejs')
})
// ​
// router.get('/createUser', (req, res)=> {
//     res.render('pages/createUser.ejs')
// })
// ​
// router.post('/createUser', async (req, res)=> {
//     let { username, password } = req.body
//     console.log(req.body)
//     let user =    await User.create({
//         username:username,
//         password:password
//     }).then((user)=>{
//       console.log( user.toJSON() )
//         res.redirect('/')
//     })

// })
​
module.exports = router
