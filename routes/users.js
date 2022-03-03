var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/delete/:userId', function(req, res, next) {
  //delete user of this userId
  const userId=req.params.userId
  //check if jwt token email matches the user id.
});

module.exports = router;
