const express = require("express");
const router = express.Router();
const Users = require('../models/Users');
const bcryptjs = require("bcryptjs");


router.get('/all', (req, res) => {
    const users = Users.find();

    users.then((data, err) => {
        res.send(data);
    }).catch(err => {
        res.status(500).send(err)
    });

})

router.post('/add', (req, res) => {
    const user = new Users(req.body);

    user.save().then(newUser => {
        res.send({ message: 'User added successfully' })
    }).catch(err => {
        res.status(500).send(err)
    });
})

// router.post('/register', (req, res) => {
//     const { email, password } = req.body;
//     const user = new Users({ email, password });

//     user.save()
//         .then(user => res.status(200).send(user))
//         .catch(err => res.status(400).send(err))
// })

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email })

    if (!user) {
        return res.send({ message: "No user found!" });
    }

    const isAuthenticated = await user.comparePassword(password);

    if (!isAuthenticated) {
        return res.send({ message: "Invalid Password!" });
    }

    const token = await user.generateToken();
    res.header("x-auth", token);
    res.send(user)
})

// protected route
router.post("/logout", (req, res) => {
    const token = req.header("x-auth");

    Users.removeToken(token)
        .then(() => res.send({ message: "removed token" }))
        .catch(err => res.send(err))
})

router.post("/register", (req, res) => {
    const user = req.body;
    const hash = hashPassword(user.password)
    
    console.log("hash =>", hash)

    const newUser = new Users({email:user.email, password: hash})

    newUser.save()
    .then(user => res.send({message:'user registerd Succesfully'}))
    .catch(err => res.send(500, {message: e.message}))
})

function hashPassword(password){
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}

router.post("/login", (req, res) => {
const {email, password} = req.body

const user = await Users.findOne({ email })

if(!user.lenth){
    res.send(500, {message:'User not Found'})
    console.log('User not Found')
    return
}
const passwordCompare = bcryptjs.compareSync(req.body.password)
if(!passwordCompare){
    res.send(500, {message:'incorrect Email/Password'})
    return
}

})




module.exports = router;