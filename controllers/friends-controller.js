const friendService = require("../service/friends-service");

class FriendsController {
    async getFriends(req, res, next) {
        try {
            const {email} = req.body;
            const friends = await friendService.getFriends(email);
            return res.json(friends);
        } catch (e) {
            next(e);
        }
    }


    async sendRequest(req, res, next){
        try{
            const {email, to} = req.body;
            await friendService.sendRequest(email, to)
        }catch(e){
            next(e)
        }
    }



}

module.exports = new FriendsController()