var express = require('express');
var app = express();
app.use(express.static('webapp'));

var fs = require('fs');
var multer = require('multer');
var path = require('path');
const sharp = require('sharp');

function createDestination() {
  var destination = Date.now();
  fs.mkdirSync("webapp/uploads/batches/"+destination+"/");
  return destination;
}

function bendingBatch(filePath, amount) {
  var destination = createDestination();
  for (let i = 0 ; i<amount ; i++) {
    var position = i/amount;
    bendfile(filePath, "webapp/uploads/batches/"+destination+"/", position, i);
  }
}

function chooseQuality(option,pos,amount) {
  switch (option) {
    case 'rnd':
      return Math.max(Math.min(Math.round(Math.random()*100), 100), 1);
      break;
    case 'no':
      return 100
      break;
    case 'prc':
      return Math.max(Math.min(pos, 100), 1);
      break;
    case 'custom':
      return amount
      break;
  }
}

function chooseBendingValue(option,position) {
  switch (option) {
    case 'mid':
      return 0.5;
      break;
    case 'rnd':
      return Math.random();
      break;
    case 'prc':
      return position/100;
      break;
  }
}

function bendingBatchCompression(filePath, extension, amount, operationOption, compressingOption, compressingChooseAmount) {
  var destination = createDestination();
  console.log(operationOption)
  for (let i = 0 ; i<amount ; i++) {
    var position = Math.round(i/amount*100);

    var shrp = sharp("webapp/uploads/"+filePath)

    shrp.toFormat(extension.substring(1),{quality:chooseQuality(compressingOption,position,compressingChooseAmount)})

    // selectExtension(shrp, extension,compressingOption,position,compressingChooseAmount);

    shrp.toFile("webapp/uploads/batches/"+destination+"/"+i+extension, (err, info) => {
      var bendingValue = chooseBendingValue(operationOption,position);
      bendfile("batches/"+destination+"/"+i+extension, "webapp/uploads/batches/"+destination+"/", bendingValue, i);
    });
  }
}

async function bendfile(filePath, destination, pos, id) {
  fs.readFile("webapp/uploads/"+filePath, 'hex', function(err, data){
    if (err) throw err;
    pos = Math.floor(data.length*pos);
    modifiedFile = data.slice(0, pos-1) + data.slice(pos);
    var newName = id+path.extname(filePath);
    fs.writeFile(destination+newName, modifiedFile, 'hex', function (err) {
      if (err) throw err;
    });
  });
}

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/webapp/index.html" );
})

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './webapp/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now()+path.extname(file.originalname));
  }
});
var upload = multer({ storage : storage}).single('myfile');

app.post('/imgprocess', function(req,res){
    upload(req,res,function(err) {
      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
          return res.send(err);
      }
      else if (err) {
          return res.send(err);
      }
      // req.body.quantity

      /*var newName = */ // bendingBatch(req.file.filename, 30);
      bendingBatchCompression(req.file.filename, req.body.extension, parseInt(req.body.quantity), req.body.bendingoperation, req.body.compressing, parseInt(req.body.compressionAmount))
      // res.send("Batch successfully corrupted :)")
      res.redirect('/');
      /*
      res.send("File is uploaded successfully! <img src='uploads/"+newName+"'>");
      */
    });
});

var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
