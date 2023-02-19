const {Sequelize, Model, DataTypes} = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:0000@localhost:5432/trpz_monopoly')

class User extends Model {
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    activationLink: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'User'
});

// User.hasMany(User)

class Token extends Model {
}

Token.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Token'
    }
)

// Token.hasOne(sequelize.models.User)

class FriendRequest extends Model {
}

FriendRequest.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        isAccepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'FriendRequest'
    }
)

// FriendRequest.hasOne(sequelize.models.User)
//some change for test git((

sequelize.sync()

module.exports = {
    User,
    Token,
    FriendRequest
}