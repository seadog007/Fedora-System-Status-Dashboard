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
    var LastErr = json.LastError[json.LastError.length - 1]
    var LastWar = json.LastWar[json.LastWar.length - 1]

    var Disk = ""
    for (var i = 0; i <= json.Disk.length -1; i++) {
        Disk = Disk + "<tr>"
        for (var j =0; j <= 5 - 1; j++){
            Disk = Disk + "<td>" + json.Disk[i][j] + "</td>"
        }
        Disk = Disk + "</tr>"
    }

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

    var L10Err = ""
    for (var i = 0; i <= json.LastError.length - 1; i++) {
        L10Err = L10Err + "<tr>"
        L10Err = L10Err + "<td>" + (i+1) + "</td>"
        L10Err = L10Err + "<td>" + json.LastError[i] + "</td>"
        L10Err = L10Err + "</tr>"
    }
    if (json.LastError.length == 0){
        L10Err = "<tr><td colspan=2>Congratulation! There is not any Error.</td></tr>"
    }

    var L10War = ""
    for (var i = 0; i <= json.LastWar.length - 1; i++) {
        L10War = L10War + "<tr>"
        L10War = L10War + "<td>" + (i+1) + "</td>"
        L10War = L10War + "<td>" + json.LastWar[i] + "</td>"
        L10War = L10War + "</tr>"
    }
    if (json.LastWar.length == 0){
        L10War = "<tr><td colspan=2>Congratulation! There is not any Warning.</td></tr>"
    }

    var Update = ""
    for (var i = 0; i <= json.Update.length - 1; i++) {
        Update = Update + "<tr>"
        for (var j = 0; j <= 3 - 1; j++) {
            Update = Update + "<td>" + json.Update[i][j] + "</td>"
        }
        Update = Update + "</tr>"
    }
    if (json.Update.length == 0){
        Update = "<tr><td colspan=3>Great! You don't have update.</td></tr>"
    }

    $('#Time').text("Data Time: " + Time);
    $('#Time2').text("Data Time: " + Time);
    $('#Uptime').text("Uptime: " + Uptime.replace("up","   "))
    $('#OnlineUser').text("Online Users: " + Users)
    $('#LoadAvg').text("Load average: " + LoadAvg)
    $('#Disktable').append(Disk)
    $('#Process_10T_CPU_Table').append(CT10P)
    $('#Process_10T_Mem_Table').append(MT10P)
    $('#Last_10_Error_Table').append(L10Err)
    $('#Last_10_Warning_Table').append(L10War)
    $('#LErr').text("Last Error: " + LastErr)
    $('#LWar').text("Last Warning: " + LastWar)
    $('#Updatetable').append(Update)
});
