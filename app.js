var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = 8080;

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});

var test1 = 'bar'; //Dessa variabler bör egentligen stoppas in i en array, mer modulärt på så sätt.
var test2 = 'foo'; //Testar bara för att lära mig push

app.get('/arrayify', (req, res) => {
  var info = req.query; //Lagrar infon i URL som en variabel
  if (info.array === undefined){//Kollar så att variabeln array finns med
    errorHandler(res);
  }
  else {
  var newArray = info.array.split(','); //Gör om info till en array
  var lowerArray = arrayLowerCase(newArray);
     verifyString(res, lowerArray);
}
});


app.post('/validate', (req, res) => {
  var findArray = req.body.array; //Tar in informationen från variabeln eller arrayen som heter array
 if (Array.isArray(findArray)) { //kollar så att array faktiskt är en array
   var lowerArray = arrayLowerCase(findArray);
        verifyString(res, lowerArray);
   } else {
errorHandler(res);
    }
});



// <--      ÅTERANVÄNDBARA FUNKTIONER     -->



//Tar in en array och ser till att all text blir till gemener
function arrayLowerCase(arr) {
  return arr.map(function (small) { //mapar igenom arrayen
    return small.toLowerCase(); //och ser till att all text blir lowercase
  });
}

//Verifierar att variblerna test1 och test2 finns med i arrayen (foo, bar)
function verifyString(res, lowerArray) {
  if (lowerArray.indexOf(test1) > -1 && lowerArray.indexOf(test2) > -1){ //Kollar så att bar och foo faktiskt finns med i arrayen
  res.status(200).send({ //skickar status 200 och visar success: true samt arrayen
    success: true,
    result: lowerArray
  });
} else {
  errorHandler(res);
  }
}

//Om något går fel körs denna funktion
function errorHandler(res) {
  res.status(400).send({ //Skickar status 400 och visar success: false
    success: false
  });
}
