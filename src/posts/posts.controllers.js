const uuid = require('uuid')

const Posts = require('../models/posts.models')

const findAllPosts = async () => {
    const data = await Posts.findAll({ attributes: {
        exclude: ['createdAt', 'updatedAt','status']
    }, where: {
        status:'enable'
    }})
    return data
}

const findPostById = async (id) => {
    const data = await Posts.findOne({attributes: {
        exclude: ['createdAt', 'updatedAt','status']
    },
        where: {
            id: id,
            status:'enable'
        }
    })
    return data
}

const createPost = async (obj) => {
    const data = await Posts.create({
        id: uuid.v4(),
        userId: obj.userId,
        content: obj.content
    })
    const {id,userId,content} = data
    return {id,userId,content}
}

const updatePost = async(id, userId, obj) => {
    const data = await Posts.update(obj, {
        where: {
            id : id,
            userId: userId,
            status:'enable'
        }
    })
    return data[0]
}

const removePost = async (id) => {
    const data = await Posts.update({status:'disabled'},{
        where: {
            id: id,
            status:'enable'
        }
    })
    return data
}




module.exports = {
    findAllPosts,
    findPostById, 
    createPost,
    updatePost,
    removePost

}
