var http = require("http");
var qs = require("querystring");
var fs = require("fs");
var mongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var Operations = require("./modules/Operations.js")
var _db;
var opers = new Operations();
var connString="";
var servres = function (req, res) {
    var allData = "";
    req.on("data", function (data) {
        console.log("data: " + data)
        allData += data;
    })
    req.on("end", function (data) {
        var finishObj = qs.parse(allData)
        //var coll = _db.collection("usersi")
        switch (finishObj.akcja) {
            //dodanie nowego usera
case "addUser":
console.log(finishObj)
opers.Insert(coll,{user:finishObj["content[login]"],password:finishObj["content[password]"]})
break;



case "refreshUser":

opers.SelectAll(coll,function(data){
    //console.log("callback")
    //console.log( data);
    
    res.end(JSON.stringify({"action":finishObj.akcja, "users":data}))
});


break;


case "deleteUser":
opers.DeleteById(ObjectID, coll, finishObj["content[id]"])
break;
case "updateUser":
opers.UpdateById(ObjectID,coll,finishObj)
break;
case "connection":
console.log(finishObj["content[adress]"]);
connString=finishObj["content[adress]"];
mongoClient.connect(`mongodb:${connString}/`, function (err, db) {
    if (err) console.log(err)
    else console.log("mongo podłączone")
    //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt

//opers.Insert(coll, data)
//opers.SelectAll(coll)
//opers.DeleteById(ObjectID, coll, "5b0520412b966c0d9cd900af")
/*
opers.SelectAndLimit (coll,function (data) {            
    //console.log("SAL")
    console.log(data)
})
*/
    // pod zmienną widoczną na zewnątrz    
    _db = db;
})
break;

            case "INNA_AKCJA":
                console.log("inna akcja")
                break;
        }
    })



}
var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            // tu wykonaj załadowanie statycznej strony z formularzem
            console.log("żądany przez przeglądarkę adres: " + req.url)
            if (req.url === "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }

            else if (req.url === "/style.css") {
                fs.readFile("static/css/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/script.js") {
                fs.readFile("static/js/script.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
                
            }
            else if (req.url === "/Net.js") {
                fs.readFile("static/js/Net.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
                
            }
        case "POST":
            // tu wywołaj funkcję "servResponse", która pobierze dane przesłane 
            // w formularzu i odpowie do przeglądarki 
            // (uwaga - adres żądania się nie zmienia)

            servres(req, res)

            break;

    }



})





server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});


