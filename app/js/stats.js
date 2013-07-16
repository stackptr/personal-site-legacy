// Create gauges
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

// Initialize and begin updating
getStats();

function getStats(){
    $.getJSON('json/server', function(data) {
        // Clear stats
        $("dd").empty();

        // Retrieve information
        var kernel, uptime, load, memory, disk, net, interfaces;
        kernel = data.kernel;
        uptime = convertSeconds(data.uptime);
        load = data.loadavg.map (function(v) { 
            return v.toPrecision(2);
        }).join(", ");
        memory = convertBytes(data.memory.used) + " / " + convertBytes(data.memory.total);
        disk = convertBytes(data.disk.used) + " / " + convertBytes(data.disk.total) + " (" +
            convertBytes(data.disk.free) + " free)";
        
        // Filter interfaces
        var interface = { name: "", down: 0, up: 0} ;
        interfaces = data.net.filter(function(v) {
            return v.up != 0;
        }).forEach(function(v) { // Get interface with most downloaded
            if ( v.down > interface.down) {
                interface.name = v.name;
                interface.down = v.down;
                interface.up = v.up
            }
        });
        net = convertBytes(interface.down) + " received, " + convertBytes(interface.up) + " transmitted";

        // Create array of information
        var info = [];
        info.push(kernel, uptime, load, memory, disk, net);

        // Write to page
        $("dd:empty").each(function(i) {
            $(this).html( info[i] );
        });

        // Update gages
        var mem_percent = (data.memory.used / data.memory.total) * 100;
        var disk_percent = (data.disk.used / data.disk.total) * 100;

        mem_gage.refresh(mem_percent.toFixed(0));
        disk_gage.refresh(disk_percent.toFixed(0));
    });
}

function convertBytes(bytes){
    var types = ['B', 'KB', 'MB', 'GB', 'TB' ];
    for ( var i = 0; bytes >= 1024 && i < ( types.length-1); bytes /= 1024, i++);
    return (bytes.toFixed(2) + " " + types[i] );
}

function convertSeconds(v){
    var d = Math.floor(v / 86400);
    var h = Math.floor(v % 86400 / 3600);
    var m = Math.floor(v % 86400 % 3600 / 60);
    var s = Math.floor(v % 86400 % 3600 % 60);

    return  (d > 0 ? d + "d " : "" ) +
            (h > 0 ? h + ":" : "") +
            (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") +
            (s < 10 ? "0" : "") + s;
}

