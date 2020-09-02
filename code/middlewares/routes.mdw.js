const restrict = require('../middlewares/auth.mdw');

module.exports = function(app){
    
    app.use('/search', require('../routes/Search.route'));
    app.use('/account', require('../routes/account.route'));
    
}