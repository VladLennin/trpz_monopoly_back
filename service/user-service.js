const {User} = require('./../db/db')
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');


class UserService {
    async registration(email, login, password) {
        let candidate = await User.findOne({where: {email: email}})
        if (candidate) {
            throw ApiError.BadRequest(`User with email ${email} already exist`)
        }
        candidate = await User.findOne({where: {login: login}})
        if (candidate) {
            throw ApiError.BadRequest(`User with login ${login} already exist`)
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

        const user = await User.create({email, login, password: hashPassword, activationLink})
        console.log("User - " + user.id + " id " + user.email)
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user); // id, email, isActivated

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink: activationLink}})
        if (!user) {
            throw ApiError.BadRequest('Incorrectly activation link')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({where: {email: email}})
        if (!user) {
            throw ApiError.BadRequest('User with this email not found')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Password isn`t correct');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async editAvatar(email, avatar) {
        const user = await User.findOne({where: {email: email}})
        if (!user) {
            throw ApiError.BadRequest('Incorrectly email')
        }
        user.avatar = avatar;
        await user.save();
        return user
    }

    async editLogin(email, login) {
        const user = await User.findOne({where: {email: email}})
        if (!user) {
            throw ApiError.BadRequest('Incorrectly email')
        }
        const candidate = await User.findOne({where: {login: login}})
        if (candidate) {
            throw ApiError.BadRequest('User with this login already exist!')
        }

        user.login = login;
        await user.save();
        return user
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findOne({where: {id: userData.id}});
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await User.findAll()
        return users;
    }
}

module.exports = new UserService();
