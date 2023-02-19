module.exports = class UserDto {
    email;
    login;
    avatar;
    id;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.login = model.login;
        this.avatar = model.avatar;
    }
}
