const json = require("../responses/json");
const db = require("../utils/db");
const unprocessable = require('../responses/unprocessable');
//Test
/*exports.getItems = (req, res)=>{
    const items = [
        {
            'id': 1,
            'title': 'Notebook',
            'price': 5500.00,
            "user_id": 5
        },
        {
            'id': 2,
            'title': 'Pen',
            'price': 20.00,
            "user_id": 1
        },
    ]
    response.status(200, items, res)
}*/

exports.createItems = async (req, res) => {
  const { title, price, image } = req.body;
  const error = [];
  if(!title){
    error.push({
      field: "title",
      message: "Title is required" 
    });
  }
  if(!price){
    error.push({
      field: "price",
      message: "Price is required"
    })
  }
  if(!image){
    error.push({
      field: "image",
      message: "Image is required"
    })
  }
  if(error.length){
    return unprocessable(error,422);
  }
  db.query(
    "INSERT INTO items(title, price, image) VALUES (?,?,?)",
    [title, price, image], (error, result) => {
        if(error){
          return json({
            body: "empty"
          },401,res);
        }
    })
}
exports.getItems = async (req, res) => {
    
};
