const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    avatar:{type:Number, default: 0},
    friends: {type: Schema.Types.ObjectId, ref: 'User'},
    friendRequests: {type: Schema.Types.ObjectId, ref:'FriendRequest'}
})

module.exports = model('User', UserSchema);
