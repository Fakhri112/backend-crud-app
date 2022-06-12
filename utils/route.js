const express = require("express");
const route = express.Router();
const { body } = require('express-validator');
const { getAuthUser, authSuccess, regiserUser, loginUser, 
    logOut, deleteAuthUser, getOneAuthUser} = require("../controller/auth_users");
const { authEmailCheck, authNamaCheck, reTypePasswordCheck,
      contactNamaCheck, contactUpdateNamaCheck } = require("../middleware/validation")
const { verify } = require("../middleware/verifyAccount");
const { refresh_token } = require("../controller/refreshToken");
const { updateContact, addContact, detailContact, 
    deleteContact, listContact } = require("../controller/users");

route.get('/contact', listContact)

route.get('/contact/auth-status',verify, authSuccess)
route.get('/contact/list-auth-user', getAuthUser)
route.post('/contact/auth-user/register',
        body('email').isEmail().withMessage('Email is Invalid'),
        body('email').custom(authEmailCheck),
        body('number').isMobilePhone('id-ID').withMessage('Incorrect Mobile Phone'),
        body('nama').custom(authNamaCheck),
        body('password').custom(reTypePasswordCheck),
    regiserUser
)
route.post('/contact/auth-user/login', loginUser)
route.get('/contact/auth-user/token/:userId', refresh_token)
route.get('/contact/auth-user/logout/:userId', logOut)
route.delete('/contact/auth-user/:userId',deleteAuthUser)

route.get('/contact/:id', detailContact)
route.post('/contact/add', body('email').isEmail().withMessage('Email is Invalid'),
        body('number').isMobilePhone('id-ID').withMessage('Incorrect Mobile Phone'),
        body('nama').custom(contactNamaCheck),
    addContact,
)
route.patch('/contact/:id',
        body('email').isEmail().withMessage('Email is Invalid'),
        body('number').isMobilePhone('id-ID').withMessage('Incorrect Mobile Phone'),
        body('nama').custom(contactUpdateNamaCheck),
    updateContact
)
route.delete('/contact/:nama', deleteContact)

module.exports = route
