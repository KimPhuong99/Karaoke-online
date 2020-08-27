module.exports = function(sequelize, DataTypes) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
 
 
        username: {
             type: DataTypes.TEXT,
             allowNull: false,
             unique: true
        },       
 
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
 
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
 
        phone: {
            type: DataTypes.INTEGER
        },
       
        image:{
            type:DataTypes.STRING,
            allowNull:true
        }
 
    });
 
    return User;
 
}


