var debugvar
$.getJSON("data.json", function (json) {
    debugvar  = json
    var Time = json.Time
    var Uptime = json.Uptime[0]
    var Users = ""
    for (var i = 0; i <= json.Users.length - 1; i++) {
        Users = Users + json.Users[i]
        if (i!=json.Users.length - 1){
            Users = Users + ", "
        }
    }
    var LoadAvg = json.Uptime[2] + ", " + json.Uptime[3] + ", " + json.Uptime[4]
    var LastErr = json.Lasterror[json.Lasterror.length - 1]
    var LastWar = json.Lastwar[json.Lastwar.length - 1]
    var CT10P = ""
    for (var i = 0; i <= json.Process_10T_CPU.length - 1; i++) {
        CT10P = CT10P + "<tr>"
        for (var j = 0; j <= 4 - 1; j++) {
            CT10P = CT10P + "<td>" + json.Process_10T_CPU[i][j] + "</td>"
        }
        CT10P = CT10P + "</tr>"
    }
    var MT10P = ""
    for (var i = 0; i <= json.Process_10T_Mem.length - 1; i++) {
        MT10P = MT10P + "<tr>"
        for (var j = 0; j <= 4 - 1; j++) {
            MT10P = MT10P + "<td>" + json.Process_10T_Mem[i][j] + "</td>"
        }
        MT10P = MT10P + "</tr>"
    }

    $('#Time').text("Data Time: " + Time);
    $('#Time2').text("Data Time: " + Time);
    $('#Uptime').text("Uptime: " + Uptime.replace("up","   "))
    $('#OnlineUser').text("Online Users: " + Users)
    $('#LoadAvg').text("Load average: " + LoadAvg)
    $('#Process_10T_CPU_Table').append(CT10P)
    $('#Process_10T_Mem_Table').append(MT10P)
    $('#LErr').text("Last Error: " + LastErr)
    $('#LWar').text("Last Warning: " + LastWar)
});
