$(document).ready(function(){
    var net=new Net();
    var adress=prompt("Podaj adres");
    console.log(adress)
    if(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(adress))
    net.sendData("connection",{"adress":adress})
    else
    net.sendData("connection",{"adress":"localhost"})
    
})