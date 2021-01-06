const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/cabina-bailon'));
app.get('/*',function(req,res){
  res.sendFile('index.html', {root: 'dist/cabina-bailon/'});
});

app.listen(process.env.PORT || 8080);
