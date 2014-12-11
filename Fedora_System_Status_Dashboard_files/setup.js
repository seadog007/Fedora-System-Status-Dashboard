var debugvar
$.getJSON("data.json", function (json) {
    debugvar  = json
    var Time = json.Time
    var Uptime = json.Uptime[0]
    var Users = ""
    for (var i = 0; i <= json.Users.length - 1; i++) {
        if (i==json.Users.length - 1){
            Users = Users + json.Users[i]
        }else{
            debugvar  = jsonsers = Users + json.Users[i] + ", "
        }
    }
    var LoadAvg = json.Uptime[2] + ", " + json.Uptime[3] + ", " + json.Uptime[4]
    var LastErr = json.Lasterror[json.Lasterror.length - 1]
    var LastWar = json.Lastwar[json.Lastwar.length - 1]

    $('#Time').text("Data Time: " + Time);
    $('#Time2').text("Data Time: " + Time);
    $('#Uptime').text("Uptime: " + Uptime.replace("up","   "))
    $('#OnlineUser').text("Online Users: " + Users)
    $('#LoadAvg').text("Load average: " + LoadAvg)
    $('#LErr').text("Last Error: " + LastErr)
    $('#LWar').text("Last Warning: " + LastWar)
});
