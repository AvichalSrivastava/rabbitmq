let express = require('express');
let mqconnect = require('./publisher');
let app = express();
mqconnect();
app.get('/',(req,res)=>
{
    res.json({message:"server started"})
})
app.listen(3000,console.log('started'));