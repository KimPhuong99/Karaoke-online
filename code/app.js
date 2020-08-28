var express = require('express');
var exphbs = require('express-handlebars');
var flash = require('connect-flash');
const path = require('path');
const session = require('express-session');
const hbs_sections = require('express-handlebars-sections');
const restrict = require('./middlewares/auth.mdw');
var app = express();

app.use(express.json());
app.use(express.urlencoded({
extended: true
}));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //     secure: true
    // }
}))
app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/layouts',
    helpers: {

        //helpers: {
        // section: hbs_sections(),
        // format: val => numeral(val).format('0,0'),
        // }
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    },
}));

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'hbs');

app.get('/', async (req, res) => {
    res.render('home')
});

require('./middlewares/locals.mdw')(app);
require('./middlewares/routes.mdw')(app);

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})