var exports = module.exports = {}
 
exports.signup = function(req, res) {
   if (req.isAuthenticated())    
        res.render('home');
    else   
    res.render('signup', { layout:false, message: req.flash('signupMessage')});
}

exports.dashboard = function(req, res) {  
    res.render('home');
}

exports.login = function(req, res) {
    if (req.isAuthenticated())    
        res.render('home');
    else 
    res.render('login',{ layout:false , message: req.flash('loginMessage')});
}

exports.profile = function (req,res) {
     res.render('profile', {
            layout:false,
            user : req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
     });
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    }); 
}

exports.search = function( req, res){
     res.render('Search');
}

exports.sing = function(req,res)
{
    try {
    const id=req.params.id;
      res.render('Sing',{
        id : id
      })
    } catch (err) {
      console.log(err);
      res.end('View error log in console.');
    }
}

exports.about = function( req, res){
     res.render('about',{layout:false});
}

exports.contact = function( req, res){
     res.render('contact',{layout:false});
}