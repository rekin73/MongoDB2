function Net(){
    this.sendData=function(akcja,inputData){
        $.ajax({
            url: "http://localhost:3000",
            data: { "akcja": akcja, "content":inputData },
            type: "POST",
            success: function (data) {
                //czytamy odesłane z serwera dane
                var obj = JSON.parse(data)
        
                console.log(obj)
                
        switch (obj.action) {

        
            default:
            console.log("succes")
                break;
        }
        
                //tu wypisz sumę w div-ie na stronie
        
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
        }
}