    var disk_gage = new JustGage({
        id: "disk-gauge",
        value: 0,
        min: 0,
        max: 100,
        title: "Disk"
    });

    var mem_gage = new JustGage({
        id: "memory-gauge",
        value: 0,
        min: 0,
        max: 100,
        title: "Memory"
    });

$(document).ready(function() {

    getStats();

    setInterval( getStats, 1000);
});

function getStats(){
    $.getJSON('json/server', function(data) {
        // Clear stats
        $("dd").empty();

        // Retrieve information
        var kernel, uptime, load, memory, disk, net, interfaces;
        kernel = data.kernel;
        uptime = data.uptime;
        load = data.loadavg.join(", ");
        memory = data.memory.used + " / " + data.memory.total;
        disk = data.disk.used + " / " + data.disk.total + " (" + data.disk.free + " free)";
        
        // Filter interfaces
        var down = 0, up = 0;
        interfaces = data.net.filter(function(v) {
            return v.up != "0.00 B";
        });
        net = interfaces[0].down + " received, " + interfaces[0].up + " transmitted";

        // Create array of information
        var info = [];
        info.push(kernel, uptime, load, memory, disk, net);

        // Write to page
        $("dd:empty").each(function(i) {
            $(this).html( info[i] );
        });

        mem_gage.refresh(data.memory.used / data.memory.total);
        disk_gage.refresh(data.disk.used / data.disk.total);
    });
}
