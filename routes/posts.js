const  router = require('express').Router();
const verify = require('./verifyToken');

router.get('/',verify, (req,res)=>{
 
    res.json({
        post:{
            title:'First post',
            description:'that was random  info'
    }
});

});


module.exports = router