const menuModels = require('../models/menu');
const miscHelpers = require('../helpers/helpers');

module.exports = {
  getMenu: (req, res) => {
    menuModels.getMenu()
      .then((result) => {
        miscHelpers.response(res, result, 200);
      })
      .catch((err) => {
        console.log(err);
      })
  },
  detailMenu: (req, res) => {
    const id = req.params.id
    menuModels.detailMenu(id)
      .then((result) => {
        miscHelpers.response(res, result, 200, 'Success!')
      })
      .catch((err) =>{
        miscHelpers.response(res, null, 202, 'Menu Not Found!')
      })
  },
  createMenu: (req, res) => {
    const { name, image, price, category } = req.body
    const data = {
      name,
      image,
      price,
      category,
    }
    menuModels.createMenu(data)
      .then((result) => {
        miscHelpers.response(res, result, 200, 'Success Create Menu!')
      })
      .catch((err) => {
        miscHelpers.response(res, null, 202, 'Create Menu Failed!')
      })
  }
}