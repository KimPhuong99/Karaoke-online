const express = require('express');
var bcrypt = require('bcryptjs');
const userModel = require('../models/user_model');
const song_userModel = require('../models/songuser_model');
const restrict = require('../middlewares/auth.mdw');

const multer = require('multer');
var path = require('path');




var mkdirp = require('mkdirp');
var path= require('path');
const router = express.Router();
var fs = require('fs');
var util=require('util');

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }

    });
}

router.get('/signup', async (req, res) => {
    res.render('account/signup', {
        layout: false
    });
});
router.post('/signup', async (req, res) => {
    const N = 10;
    const hash = bcrypt.hashSync(req.body.password, N);
    const entity = req.body;
    delete entity.confirm_password;
    const rows = await userModel.all();
    entity.password = hash;
    entity.ID = rows.length + 1;

    const kt1 = await userModel.singleByUsername(entity.username);
    const kt2 = await userModel.singleByMail(entity.email);

    if(kt1!=null){
        return res.render('account/signin', {
            layout: false,
            err_message: 'the same username'
          });
    }

    if(kt2!=null){
        return res.render('account/signin', {
            layout: false,
            err_message: 'the same email'
          });
    }
    const result = await userModel.add(entity);
    var dir = './public/user/' + entity.ID;
    fs.mkdirSync(dir);
<<<<<<< HEAD
    res.redirect('/account/login');
=======
    res.render('account/signup', {
        layout: false
    });
>>>>>>> 19969756a1acd1d2a2748759abe0452afee4ee71
})
router.get('/login', async (req, res) => {
    res.render('account/login', {
        layout: false
    });
})

router.post('/login', async (req, res) => {
    const user = await userModel.singleByUsername(req.body.username);
    if (user === null) {
        return res.render('account/login', {
            layout: false,
            err_message: 'Invalid username '
        });
    }

    const rs = bcrypt.compareSync(req.body.password, user.password);

    if (rs === false)
        return res.render('account/login', {
            layout: false,
            err_message: 'Login failed'
        });

    delete user.password;
    req.session.isAuthenticated = true;
    req.session.authUser = user;
    //res.locals.isAuthenticated = req.session.isAuthenticated;
    //res.locals.authUser = req.session.authUser;

    const url = req.query.retUrl || '/';
   
    res.redirect(url);
})

router.get('/profile', async (req, res) => {

    var data = [];

   var filename  = "l";
     readFiles('./public/user/' + req.session.authUser.ID + '/',  function (filename, content) {

        data.push({
            name: filename,

        });
        console.log("ccccc");
    }, function (err) {
        throw err;
    })
    console.log(data);
    const user = await song_userModel.single(req.session.authUser.ID);
    console.log(user);
<<<<<<< HEAD
   
    // We replaced all the event handlers with a simple call to util.pump()
    res.render('./account/profile',{
        
        u : user
=======
    res.render('account/profile', {
        file: user
>>>>>>> 19969756a1acd1d2a2748759abe0452afee4ee71
    })

})

router.get('/account/profile/image', async (req, res)=>{

})

router.post('/logout', (req, res) => {

    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect('/');
});

module.exports = router;