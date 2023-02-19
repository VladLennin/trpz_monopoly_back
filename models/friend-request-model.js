// const {Schema, model} = require('mongoose');
//
// const FriendRequestSchema = new Schema({
//     from: {type: Schema.Types.ObjectId, ref: 'User', required: true},
//     to: {type: Schema.Types.ObjectId, ref: 'User', required: true},
//     isAccepted: {type: Boolean, default: false}
// })
//
// module.exports = model("FriendRequest", FriendRequestSchema)

//
// const {DataTypes} = require('sequelize');
// const sequelize = import('./../index')
//
// export const FriendRequest = sequelize.define('FriendRequest',{
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull:false
//     },
//     isAccepted:{
//         type:DataTypes.BOOLEAN,
//         defaultValue:false
//     }
// })
//
// FriendRequest.hasOne(sequelize.models.User)

