const connection = require('../configs/db');

module.exports = {
  getMenu: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM `menu`", (err, result) => {
        if(!err) {
          resolve(result);
        }
        reject(new Error(err));
      })
    })
  },
  createMenu: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO `menu` SET ?", data, (err, result) => {
        if(!err) {
          resolve(result)
        }
        reject(new Error(err))
      })
    })
  },
  detailMenu: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM `menu` WHERE id = ?", id, (err, result) => {
        if(!err) {
          resolve(result)
        }
        reject(new Error(err))
      })
    })
  }
}