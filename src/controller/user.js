const { genSaltSync, compareSync, hashSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const miscHelper = require('../helpers/helpers');

module.exports = {
    userGet: (req, res) => {
        userModel.userGet()
            .then((result) => {
                miscHelper.response(res, result, 200, 'Success');
            })
            .catch((err) => {
                miscHelper.response(res, null, 202, 'User Not Found');
            })
    },
    userDetail: (req, res) => {
        const id = req.params.id
        userModel.userDetail(id)
            .then((result) => {
                miscHelper.response(res, result, 200, 'Success')
            })
            .catch((err) => {
                miscHelper.response(res, null, 202, 'User Not Found')
            })
    },
    register: (req, res) => {
        const {email, fullname, password} = req.body
        const data = {
            email,
            fullname,
            password,
        }
        const salt = genSaltSync(10)
        data.password = hashSync(data.password, salt)
        userModel.register(data)
            .then((result) => {
                result.email = data.email
                const newresult = result
                const token = jwt.sign({id: result.insertId, email: result.email}, 'solayman')
                newresult.token = token
                miscHelper.response(res, newresult, 200, 'Register Succes!')
            })
            .catch((err) => {
                console.log(err)
                miscHelper.response(res, null, 202, 'Register Failed!')
            })
    },
    login: (req, res) => {
        const { email, password } = req.body
        const data = {
            email,
            password
        }
        userModel.login(data.email)
            .then((result) => {
                // console.log(result)
                const token = jwt.sign({id: result[0].id, email: result[0].email}, 'solayman')
                const checkpass = compareSync(data.password, result[0].password)
                if(checkpass === false) {
                    miscHelper.response(res, null, 202, 'Invalid Password!')
                }
                // miscHelper.response(res, result, 200, 'Login Successfully!')
                return res.json({
                    success: 1,
                    message: 'Login Success',
                    result: result[0],
                    token: token,
                })
            })
            .catch((err) => {
                // console.log(err)
                miscHelper.response(res, null, 202, 'Invalid Email!')
            })
    },
    deleteUser: (req, res) => {
        const id = req.params.id
        userModel.deleteUser(id)
            .then((result) => {
                if(result.length <= 0) {
                    miscHelper.response(res, null, 202, 'User Not Found')
                }
                        miscHelper.response(res, result, 200, 'Delete Success!')
            })
            .catch((err) => {
                miscHelper(res, null, 202, 'User Not Found!')
            })
    }
}