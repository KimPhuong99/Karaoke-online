var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var morgan = require('morgan');
var passport = require('passport');
var exphbs = require('express-handlebars');
const path = require('path');
var env = require('dotenv').config({path:'Karaoke-Online/.env'});;
var models = require(path.join(__dirname,'/Karaoke-Online/app/models'));
var port = process.env.PORT || 3000;
var app = express();

//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

app.use(flash());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/Karaoke-Online/public')));
app.engine('hbs',exphbs({
    defaultLayout : 'main.hbs',
    helpers: {
        section: function(name, options){ 
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this); 
            return null;
        } 
    },    
    layoutsDir : 'Karaoke-Online/views/layouts'
}));
app.set('view engine','hbs');
app.set('views', path.join(__dirname, '/Karaoke-Online/views'));

app.use(session({
    secret: 'justasecret',
    resave:true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

 

app.use(passport.initialize());
app.use(passport.session());

require(path.join(__dirname,'/Karaoke-Online/config/passport.js'))(passport);
var authRoute = require('./Karaoke-Online/app/routes/auth.js')(app,passport);


app.listen(port,()=>{
    console.log('server is running at '+port);
    console.log(__dirname);
});



