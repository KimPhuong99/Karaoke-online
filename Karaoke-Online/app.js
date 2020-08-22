var express= require('express');
var exphbs = require('express-handlebars');
const path = require('path');
var app = express();
app.engine('hbs',exphbs({
    defaultLayout : 'main.hbs',
    helpers: {
        section: function(name, options){ 
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this); 
            return null;
        } 
    },    
    layoutsDir : 'views/layouts'
}));

app.use(express.static(path.join(__dirname,'/public')));
app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('home')
});



app.use('/search', require('./routes/Search.route'));

app.listen(3000,()=>{
    console.log('server is running at http://localhost:3000')
})