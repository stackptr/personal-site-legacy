$.getJSON('json/server', function(data) {
    // Retrieve information
    var kernel, uptime, load, memory, disk, net, interfaces;
    kernel = data.kernel;
    uptime = data.uptime;
    load = data.loadavg.join(", ");
    memory = data.memory.used + " / " + data.memory.total;
    disk = data.disk.used + " / " + data.disk.total + " (" + data.disk.free + " free)";
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
});
