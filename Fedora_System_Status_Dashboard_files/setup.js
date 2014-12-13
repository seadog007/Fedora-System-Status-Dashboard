var debugvar
var changevar
$.getJSON("data.json", function (json) {
    changevar  = json
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
    var CPU_Name = json.CPU_Name
    var CPU_Cores = json.CPU_Cores
    var LastErr = json.LastError[json.LastError.length - 1]
    var LastWar = json.LastWar[json.LastWar.length - 1]

    var CPU = ""
    var CPUIdle = json.CPUs[0][10]
    for (var i = 0; i <= json.CPUs.length - 1; i++) {
        CPU = CPU + "<tr>"
        for (var j = 0; j <= 11 - 1; j++){
                CPU = CPU + "<td>" + json.CPUs[i][j] + "</td>"
        }
        CPU = CPU + "</tr>"
    }

    var DiskUseAvg = 0
    var DiskTotalAvail = 0
    var DiskTotalUsed = 0
    var DiskTotalSize = 0
    var Disk = ""
    for (var i = 0; i <= json.Disk.length - 1; i++) {
        Disk = Disk + "<tr>"
        for (var j =0; j <= 5 - 1; j++){
            if (j >= 2 - 1 & j <= 4 - 1){
                Disk = Disk + "<td>" + (Math.round(json.Disk[i][j]/1000/10)/100) + " GB" + "</td>"
            }else{
                Disk = Disk + "<td>" + json.Disk[i][j] + "</td>"
            }
        }
        DiskUseAvg = (DiskUseAvg + Number(json.Disk[i][4].replace("%","")))
        DiskTotalAvail = (DiskTotalAvail + Number(json.Disk[i][3]))
        DiskTotalUsed = (DiskTotalUsed + Number(json.Disk[i][2]))
        DiskTotalSize = (DiskTotalSize + Number(json.Disk[i][1]))
        Disk = Disk + "</tr>"
    }
    DiskUseAvg = (DiskUseAvg/json.Disk.length)

    var Memory = ""
    var MemorySize = json.Mem[0]
    var MemoryAvail = json.Mem[1]
    var MemoryUsed = json.Mem[2]
    var MemoryBuffer = json.Mem[3]
    Memory = Memory + "<tr>"
    Memory = Memory + "<td>Memory</td>"
    for (var i = 0; i <= json.Mem.length - 1; i++) {
        Memory = Memory + "<td>" + (Math.round(json.Mem[i]/1000/10)/100) + " GB" + "</td>"
    }
    Memory = Memory + "</tr>"

    var Swap = ""
    var SwapSize = json.Swap[0]
    var SwapFree = json.Swap[1]
    var SwapUsed = json.Swap[2]
    var SwapAvail = json.Swap[3]
    Swap = Swap + "<tr>"
    Swap = Swap + "<td>Swap</td>"
    for (var i = 0; i <= json.Swap.length - 1; i++){
        Swap = Swap + "<td>" + (Math.round(json.Swap[i]/1000/10)/100) + " GB" + "</td>"
    }
    Swap = Swap + "</tr>"

    var Net = ""
    for (var i = 0; i <= json.Network.length - 1; i++) {
        Net = Net + "<tr>"
        for (var j = 0; j <= 5 - 1; j++){
            Net = Net + "<td>" + json.Network[i][j] + "</td>"
        }
        Net = Net + "</tr>"
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


    var Files = ""
    for (var i = 0; i <= json.Files.length - 1; i++) {
        Files = Files + "<tr>"
        for (var j = 0; j <= 2 - 1; j++) {
            Files = Files + "<td>" + json.Files[i][j] + "</td>"
        }
        Files = Files + "</tr>"
    }
    if (json.Files.length == 0){
        Files = "<tr><td colspan=3>Great! All files are safe.</td></tr>"
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

    $('#ov1per').text("Used: " + (Math.round((100 - CPUIdle)*100)/100) + "%")
    $('#ov2per').text("Used: " + (Math.round((MemoryUsed/MemorySize)*10000)/100) + "%" + "\n" + ((Math.round(MemoryUsed/1000/10)/100) + " GB") + "/" + ((Math.round(MemorySize/1000/10)/100) + " GB") + "\n" + "(Buffer/Cache: " + ((Math.round(MemoryBuffer/1000/10)/100) + " GB") + ")")
    $('#ov2per').html($('#ov2per').html().replace(/\n/g,'<br>'));
    $('#ov3per').text("Used: " + DiskUseAvg + "%" + "\n"  + ((Math.round(DiskTotalUsed/1000/10)/100) + " GB") + "/" + ((Math.round(DiskTotalSize/1000/10)/100) + " GB") + "\n" + " (Free: " + ((Math.round(DiskTotalAvail/1000/10)/100) + " GB") + ")")
    $('#ov3per').html($('#ov3per').html().replace(/\n/g,'<br>'));
    $('#ov4per').text("Used: " + (Math.round((SwapUsed/SwapSize)*10000)/100) + "%" + "\n" + ((Math.round(SwapUsed/1000/10)/100) + " GB") + "/" + ((Math.round(SwapSize/1000/10)/100) + " GB") + "\n" + "(Free: " + ((Math.round(SwapFree/1000/10)/100) + " GB") + " Avail: " + ((Math.round(SwapAvail/1000/10)/100) + " GB") + ")")
    $('#ov4per').html($('#ov4per').html().replace(/\n/g,'<br>'));
    $('#Time').text("Data Time: " + Time);
    $('#Time2').text("Data Time: " + Time);
    $('#Uptime').text("Uptime: " + Uptime.replace("up","   ").split(" ")[3].replace("day"," Day  "))
    $('#OnlineUser').text("Online Users: " + Users)
    $('#LoadAvg').text("Load average: " + LoadAvg)
    $('#CPU_Name').text("CPU Name: " + CPU_Name)
    $('#CPU_Cores').text("CPU Cores: " + CPU_Cores)
    $('#CPUtable').append(CPU)
    $('#Disktable').append(Disk)
    $('#MemXSwap').append(Memory)
    $('#MemXSwap').append(Swap)
    $('#Network_Table').append(Net)
    $('#Process_10T_CPU_Table').append(CT10P)
    $('#Process_10T_Mem_Table').append(MT10P)
    $('#Files_Table').append(Files)
    $('#Last_10_Error_Table').append(L10Err)
    $('#Last_10_Warning_Table').append(L10War)
    $('#LErr').text("Last Error: " + LastErr)
    $('#LWar').text("Last Warning: " + LastWar)
    $('#Updatetable').append(Update)

    var ov1data = [{
        value: CPUIdle,
        color: "#E0E0E0",
        highlight: "#F0F0F0",
        label: "Not Use"
    }, {
        value: (Math.round((100 - CPUIdle)*100)/100),
        color: "#0D8FDB",
        highlight: "#1FA1ED",
        label: "Used"
    }]

    var ov2data = [{
        value: (Math.round((MemorySize-MemoryUsed)/1000/10)/100),
        color: "#E0E0E0",
        highlight: "#F0F0F0",
        label: "Not Use"
    }, {
        value: (Math.round((MemoryUsed)/1000/10)/100),
        color: "#0D8FDB",
        highlight: "#1FA1ED",
        label: "Used"
    }]

    var ov3data = [{
        value: (Math.round((DiskTotalSize-DiskTotalUsed)/1000/10)/100),
        color: "#E0E0E0",
        highlight: "#F0F0F0",
        label: "Not Use"
    }, {
        value: (Math.round((DiskTotalUsed)/1000/10)/100),
        color: "#0D8FDB",
        highlight: "#1FA1ED",
        label: "Used"
    }]

    var ov4data = [{
        value: (Math.round((SwapFree)/1000/10)/100),
        color: "#E0E0E0",
        highlight: "#F0F0F0",
        label: "Not Use"
    }, {
        value: (Math.round((SwapSize-SwapFree)/1000/10)/100),
        color: "#0D8FDB",
        highlight: "#1FA1ED",
        label: "Used"
    }]


     netdata = {
        labels: [],
        datasets: [{
            label: "Download",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.9)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: []
        }, {
            label: "Upload",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: []
        }]
    };

    json.Network.forEach(function(item){
        netdata.labels.push(item[0]);
        netdata.datasets[0].data.push(item[1]);
        netdata.datasets[1].data.push(item[2]);
    });

    $('#Net_Select').change(function() {

        netdata = {
            labels: [],
            datasets: [{
                label: "Download",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.9)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: []
            }, {
                label: "Upload",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: []
            }]
        };

        if ($('#Net_Select').val()=="Packets"){
            changevar.Network.forEach(function(item){
                netdata.labels.push(item[0]);
                netdata.datasets[0].data.push(item[1]);
                netdata.datasets[1].data.push(item[2]);
            });
        }else{
            changevar.Network.forEach(function(item){
                netdata.labels.push(item[0]);
                netdata.datasets[0].data.push(item[3]);
                netdata.datasets[1].data.push(item[4]);
            });
        }

        var netctx = $('#net').get(0).getContext("2d");
        var netc = new Chart(netctx).Bar(netdata, netoptions);
    });

    var ov1ctx = $('#ov1').get(0).getContext("2d");
    var ov1c = new Chart(ov1ctx).Doughnut(ov1data, ovoptionsp);
    var ov2ctx = $("#ov2").get(0).getContext("2d");
    var ov2c = new Chart(ov2ctx).Doughnut(ov2data, ovoptionss);
    var ov3ctx = $('#ov3').get(0).getContext("2d");
    var ov3c = new Chart(ov3ctx).Doughnut(ov3data, ovoptionss);
    var ov4ctx = $('#ov4').get(0).getContext("2d");
    var ov4c = new Chart(ov4ctx).Doughnut(ov4data, ovoptionss);
    var netctx = $('#net').get(0).getContext("2d");
    var netc = new Chart(netctx).Bar(netdata, netoptions);

});
$('body').scrollspy({offset: 80, target: '.sidebar' })
