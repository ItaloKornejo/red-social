const uuid = require('uuid')
const Likes = require('../models/likes.models')
const Users = require('../models/users.models')

const findAllLikesFromPost = async (postId) => {
    const data = await Likes.findAll({
        where :{
            postId: postId
        },
        include: {
            model: Users,
            attributes: ['id', 'firstName', 'lastName']
        }
    })
    return data.map(like => like.user)
}

const createLike = async (obj) => {

    const validate = await Likes.findOne({
        where: {
            userId: obj.userId,
            postId: obj.postId
        }
    })

    if(validate){
        await Likes.destroy({
            where: {
                id: validate.id
            }
        })
        return null
    }
    
    const data = await Likes.create({
        id: uuid.v4(),
        userId: obj.userId,
        postId: obj.postId
    })
    const {id,userId,postId} = data
    return {id,userId,postId}
}

module.exports = {
    findAllLikesFromPost,
    createLike
}
