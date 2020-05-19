const connection = require('../configs/db');

module.exports = {
    userGet: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM user", (err, result) => {
                if(!err) {
                    resolve(result)
                }
                reject(new Error(err));
            })
        })
    },
    userDetail: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM user WHERE id = ?", id, (err, result) => {
                if(!err) {
                    resolve(result)
                }
                reject(new Error(err))
            })
        })
    },
    register: (data) => {
        return new Promise((resolve, reject) => {
            // console.log(connection)
            connection.query("INSERT INTO user SET ?", data, (err,result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    login: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM user WHERE email = ?", data, (err, result) => {
                if(!err) {
                    resolve(result)
                }
                reject(new Error(err))
            })
        })
    },
    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM `user` WHERE id = ?", id, (err, result) => {
                if(!err) {
                    resolve(result)
                }
                reject(new Error(err))
            })
        })
    }
}