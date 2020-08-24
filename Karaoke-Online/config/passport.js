const path = require('path');
var bcrypt = require('bcrypt-nodejs');
var models = require(path.join(process.cwd(),'Karaoke-Online/app/models'));
var User = models.user;


module.exports = function (passport) {
   // var User = user;
    var LocalStrategy = require("passport-local").Strategy;
    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function (id, done) {
     
     User.findByPk(id).then(function(user) {
        if (user) {
            done(null, user.get()); 
        } else {
            done(user.errors, null); 
        }
 
    });
    }
       
    )

    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                usernameField :'username',
                passwordField: 'password',
                passReqToCallback : true
            },
            function (req,username, password, done) {
              
              process.nextTick(function() {
                         User.findOne({
                                where: {
                                        username: username
                                        }
                                    }).then(function(user) {
                if (user) 
                {       console.log("That is already taken");
                        return done(null, false, {message: req.flash('signupMessage','Tên đăng nhập đã tồn tại')});
                 } else
 
                 {
                     var userPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
 
                     var data =
 
                    {
                         username: username,
 
                        password: userPassword,
 
                        email: req.body.email,
 
                        phone: req.body.phone,

                        image: ''

                    }
 
 
                        User.create(data).then(function(newUser, created) {
 
                        if (!newUser) {
                        console.log("Failed in adding new acc");
                        return done(null, false,{message: req.flash('signupMessage','Tạo tài khoản không thành công')});
                         }
 
                         if (newUser) {
                                console.log("Success in adding new acc");
                                return done(null, newUser,{message: req.flash('sigupMessage','Tạo tài khoản thành công')});
 
                         }
 
                        })
 
                      }
 
        })
        })

        }
    
    ))
    

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function (req, username, password, done) {   
             
             process.nextTick(function() {        
                 User.findOne({
                     where:{
                         username:username
                     }
                 }).then(function (user) {
                     if(!user){
                         console.log("No User Found");
                          return done(null, false, {message: req.flash('loginMessage','Tài khoản chưa đăng ký')});
                     }
                    
                     if(!bcrypt.compareSync(password, user.password))
                     {
                         console.log("Wrong password");
                         return done(null, false, {message: req.flash('loginMessage','Sai mật khẩu')});
                     }

                     return done(null,user.get());
                 }).catch(function (err) {
                      console.log("Error:", err);
 
                     return done(null, false, 
                             {message:req.flash('loginMessage','Lỗi hệ thống')}
                     )
 
                 })

        }) }
        )
    )
}
