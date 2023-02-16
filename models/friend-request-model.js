const {Schema, model} = require('mongoose');

const FriendRequestSchema = new Schema({
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    accepted:{type:Boolean, default:false}
})

module.exports = model("FriendRequest", FriendRequestSchema)
