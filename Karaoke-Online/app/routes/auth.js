var path = require('path');
var authController = require(path.join(process.cwd(),'/Karaoke-Online/app/controller/authcontroller.js'));
 
module.exports = function(app,passport) {
 
    function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())    
        return next();         
        res.redirect('login');
    }

    app.get('/signup', authController.signup);

    app.get ('/login', authController.login);
  
    app.get('/logout',authController.logout);
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: 'login',
        failureFlash : true
    }));
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: 'login',
        failureFlash : true
    }));

    app.get('/', isLoggedIn, authController.dashboard);

    app.get('/profile', isLoggedIn, authController.profile);
   
    app.get('/search', isLoggedIn , authController.search);

    app.get('/sing/:id', isLoggedIn, authController.sing);
    
    app.get('/about', isLoggedIn , authController.about);

    app.get('/contact', isLoggedIn , authController.contact);
    

}