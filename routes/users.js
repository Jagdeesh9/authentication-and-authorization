var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
mongoose.connect("mongodb://127.0.0.1:27017/Jagdeesh");

const userSchema =mongoose.Schema({
  Username:String,
  Name: String,
  Age: Number
})

module.exports=mongoose.model("userModel",userSchema);
// module.exports = router;
