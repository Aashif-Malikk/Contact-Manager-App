const express = require('express')
const router = express.Router()
const authControl = require('../Controller/authController')
const verifyToken = require('../middleware/tokenMiddleware')

router.post('/auth/signup', authControl.register)
router.post('/auth/login', authControl.logIn)
router.get('/home',verifyToken, authControl.gettingUserDeatils)
router.get('/profile',verifyToken, authControl.gettingUserDeatils)
router.post('/addContact',verifyToken, authControl.addingContact)
router.post('/myfavorite',verifyToken,authControl.getFavorite)
router.get('/myfavorite',verifyToken,authControl.showFavoriteContact)
router.post('/editprofile',verifyToken,authControl.profileEdit)
module.exports = router