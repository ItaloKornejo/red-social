require('dotenv').config()

module.exports = {
    api: {
        //! port: process.env.PORT ? process.env.PORT : 3000,
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'http://localhost:',
        jwtSecret: process.env.JWT_SECRET,
        emailPass: process.env.MAIL_PASS,
        emailSend: process.env.MAIL_SEND,
        emailHost: process.env.MAIL_HOST
    },
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT
    }
}

