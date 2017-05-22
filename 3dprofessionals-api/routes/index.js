var express = require('express');
var router = express.Router();

//Get home page

router.get('/', (req, res, next) => {

  let user = req.user;

    Project.find({}, (err, projects) => {
      if (err) {
        next(err);
      } else {
        res.render('index', { user: user, projects: projects});
      }
    });
});


module.exports = router;
