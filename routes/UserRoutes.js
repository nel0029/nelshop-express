const express = require('express')
const router = express.Router()


const registerUser = require('../controllers/users/Register')
const logInUser = require('../controllers/users/LogIn')
const getAllUsers = require('../controllers/users/GetAllUser')
const updateUser = require('../controllers/users/UpdateUser')
const deleteUser = require('../controllers/users/DeleteUser')
const getUserDetails = require('../controllers/users/GetUserDetails')
const createUserByAdmin = require('../controllers/users/CreateUserByAdmin')
const getAccountDetails = require('../controllers/users/GetAccountDetails')
const updateAccount = require('../controllers/users/UpdateAccount')
const getUserAddress = require('../controllers/users/GetUserAddress')


router.post('/login', logInUser)
router.post('/register', registerUser)
router.post('/new', createUserByAdmin)
router.get('/all', getAllUsers)
router.put('/update', updateUser)
router.delete('/delete/:userID', deleteUser)
router.get('/details/:userID', getUserDetails)
router.get('/account/details/:userID', getAccountDetails)
router.put('/account/update', updateAccount)
router.get('/address/:userID', getUserAddress)


module.exports = router