const {Schema, model} = require('mongoose');
//
// const UserSchema = new Schema({
//     email: {type: String, unique: true, required: true},
//     login: {type: String, unique: true, required: true},
//     password: {type: String, required: true},
//     isActivated: {type: Boolean, default: false},
//     activationLink: {type: String},
//     avatar: {type: Number, default: 0},
//     friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
// })
//
// module.exports = model('User', UserSchema);


const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActivated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        activationLink: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        // Other model options go here
    });

    User.hasMany(User)
    return User;
};