var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '代码统计',
    result: []
  });
});

router.post('/',function (req,res) {
  var command  = "cloc_git " + req.body.git_url;
   console.log(command);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('exec error: ${error}');
      return;
    }

    var temp = stdout.split("\n");
    var result = [];
    var tbh_index = temp.indexOf('Language                     files          blank        comment           code');

    for (let i = tbh_index; i < temp.length; i++) {
      result.push(temp[i]);
    }
    console.log(result);
    res.render('index', {
      title: '代码统计',
      result:  result
    });
  });
});
module.exports = router;
