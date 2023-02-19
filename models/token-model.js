// const {Schema, model} = require('mongoose');
//
// const TokenSchema = new Schema({
//     user: {type: Schema.Types.ObjectId, ref: 'User'},
//     refreshToken: {type: String, required: true},
// })
//
// module.exports = model('Token', TokenSchema);


const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
   const Token = sequelize.define('Token',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        refreshToken:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Token.hasOne(sequelize.models.User)
    return Token;
};