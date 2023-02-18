const UserModel = require('../models/user-model');
const RequestFriendModel = require('../models/friend-request-model')
const ApiError = require('../exceptions/api-error')
const UserDto = require('../dtos/user-dto')

class FriendsService {

    async getFriends(email) {
        const user = await UserModel.findOne({email})
        // const userDto = new UserDto(user)
        return user
    }

    async getRequests(email) {
        const user = await UserModel.findOne({email})
        const requests = await RequestFriendModel.find({to: user})
        return requests
    }


    async sendRequest(from, to) {
        const sender = await UserModel.findOne({email: from})
        const recipient = await UserModel.findOne({email: to})
        console.log(1 + sender)
        console.log(2 + recipient)

        if (!sender) {
            throw ApiError.BadRequest("Bad sender")
        }
        if (!recipient) {
            throw ApiError.BadRequest("Bad recipient")
        }

        const request = await RequestFriendModel.create({from: sender, to: recipient})
        // request.save()
    }


}

module.exports = new FriendsService()
