const express = require('express');
var bcrypt = require('bcryptjs');
const userModel = require('../models/user_model');
const song_userModel = require('../models/songuser_model');
const restrict = require('../middlewares/auth.mdw');
var mkdirp = require('mkdirp');
const router = express.Router();
var fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }

    });
}

router.get('/signin', async (req, res) => {
    res.render('account/signin', {
        layout: false
    });
});
router.post('/signin', async (req, res) => {
    const N = 10;
    const hash = bcrypt.hashSync(req.body.password, N);
    const entity = req.body;
    delete entity.confirm_password;
    const rows = await userModel.all();
    entity.password = hash;
    entity.ID = rows.length + 1;
    const result = await userModel.add(entity);
    var dir = './user/' + entity.ID;
    fs.mkdirSync(dir);
    res.render('account/signin', {
        layout: false
    });
})
router.get('/login', async (req, res) => {
    res.render('account/login', {
        layout: false
    });
})

router.post('/login', async (req, res) => {
    const user = await userModel.singleByUsername(req.body.username);
    if (user === null) {
        throw new Error('Invalid username or password.');
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
    res.locals.isAuthenticated = req.session.isAuthenticated;
    res.locals.authUser = req.session.authUser;

    const url = req.query.retUrl || '/';
    res.redirect(url);
})

router.get('/profile', async (req, res) => {

    var data = [];

    await readFiles('user/' + req.session.authUser.ID + '/', await function (filename, content) {

        data.push({
            name: filename,

        });
        console.log("ccccc");
    }, function (err) {
        throw err;
    })
    const user = await song_userModel.single(req.session.authUser.ID);
   console.log(user);
    res.render('account/profile', {
        file: user
    })

})

router.post('/logout', (req, res) => {

    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect('/');
});

module.exports = router;