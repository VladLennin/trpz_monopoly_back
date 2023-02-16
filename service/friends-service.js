const UserModel = require('../models/user-model');
const RequestFriendModel = require('../models/friend-request-model')
const ApiError = require('../exceptions/api-error')
class FriendsService {

    async getFriends(mail) {
        const friends = await UserModel.findOne({mail}).populate()
        return friends
    }

    async sendRequest(email, to) {
        const sender = await UserModel.findOne({email})
        const recipient = await UserModel.findOne({to})

        if(!sender){
            throw ApiError.BadRequest("Bad sender")
        }
        if(!recipient){
            throw ApiError.BadRequest("Bad recipient")
        }

        const request = await RequestFriendModel.create({sender})
        recipient.friendRequests.push(request)
        recipient.save()
        sender.save()
    }


}

module.exports = new FriendsService()
