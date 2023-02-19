const ApiError = require('../exceptions/api-error')
const UserDto = require('../dtos/user-dto')
const {User, FriendRequest} = require('../db/db')


class FriendsService {

    async getFriends(email) {
        const user = await User.findOne({where: {email: email}})
        const userDto = new UserDto(user)
        return user
    }

    async getRequests(email) {
        // const user = await User.findOne({where: {email:email}})
        // const requests = await FriendRequest.find({to: user})
        // return requests
    }


    async sendRequest(from, to) {
        // const sender = await User.findOne({email: from})
        // const recipient = await UserModel.findOne({email: to})
        // console.log(1 + sender)
        // console.log(2 + recipient)
        //
        // if (!sender) {
        //     throw ApiError.BadRequest("Bad sender")
        // }
        // if (!recipient) {
        //     throw ApiError.BadRequest("Bad recipient")
        // }
        //
        // const request = await FriendRequest.create({})
        // // request.save()
    }


}

module.exports = new FriendsService()
