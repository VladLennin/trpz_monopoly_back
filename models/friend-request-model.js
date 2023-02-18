const {Schema, model} = require('mongoose');

const FriendRequestSchema = new Schema({
    from: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    to: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    isAccepted: {type: Boolean, default: false}
})

module.exports = model("FriendRequest", FriendRequestSchema)
