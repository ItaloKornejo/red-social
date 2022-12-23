const router = require('express').Router()
const authServices = require('./auth.services')

router.post('/login', authServices.postLogin)
router.post('/recovery-password', authServices.postRecoveryToken)
router.patch('/recovery-password/:id', authServices.patchPassword)
router.get('/verify-user/:id', authServices.verifyUser)

module.exports = router
