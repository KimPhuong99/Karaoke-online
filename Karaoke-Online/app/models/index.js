"use strict";
 
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";

var config  = require(process.cwd()+"/Karaoke-Online/config/config.js");
const sequelize = new Sequelize(config.db.database,config.db.user, config.db.password,
{
    host:config.db.host,
    dialect:config.db.dialect
})
var db = {};
 
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });
 
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;