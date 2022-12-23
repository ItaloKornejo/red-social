const uuid = require('uuid')
const { findUserByEmail, updateUser } = require('../users/users.controllers')
const { comparePassword, hashPassword } = require('../utils/crypto')

const RecoveryPassword = require('../models/recoveryPasswords.models')
const Users = require('../models/users.models')

const checkUsersCredentials = async (email, password) => {
    try {
        const user = await findUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password)
        if (verifyPassword) {
            return user
        }
        return null
    } catch (error) {
        return null
    }
}

const createRecoveryToken = async (email) => {
    try {
        const user = await findUserByEmail(email)
        const data = await RecoveryPassword.create({
            id: uuid.v4(),
            userId: user.id
        })
        return data
    } catch (error) {
        return null
    }
}

const changePassword = async (tokenId, newPassword) => {
    const recoveryData = await RecoveryPassword.findOne({
        where: {
            id: tokenId,
            used: false
        }
    })
    if (recoveryData) {
        await RecoveryPassword.update({ used: true }, {
            where: {
                id: tokenId
            }
        })
        const data = await updateUser(recoveryData.userId, {
            password: hashPassword(newPassword)
        })
        return data
    } else {
        return error
    }
}

const userCheck = async (userId) => {
    const userVerificationStatus = await Users.findOne({
        where: {
            id: userId,
            isVerified: false
        }
    })
    if(userVerificationStatus){
        const data = await Users.update({isVerified: true}, {
            where: {
                id: userId
            }
        })
        return data
    } else {
        return null
    } 
}


module.exports = {
    checkUsersCredentials,
    createRecoveryToken,
    changePassword,
    userCheck
}