const nodemailer = require('nodemailer')
const config = require('../../config')

const transporter = nodemailer.createTransport({
    host: config.api.emailHost,
    port: 465 ,
    secure: true,
    auth: {
        user: config.api.emailSend,
        pass: config.api.emailPass
    }
})

module.exports = transporter
