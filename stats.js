var os = require('os');

module.exports = function(fn){
    require('async').parallel([
        // Perform non-blocking functions:
        getDisk,
        getNet,
    ],
    function(err, results) {
        var stats = {
            kernel: os.release(),
            uptime: getUptime(),
            loadavg: getLoad(),
            memory: getMemory(),
            disk: results[0],
            net: results[1],
        };
        if (err) return fn(err);
        
        return fn(null, stats);
    });
};

function getUptime() {
    var up = os.uptime();
    var d = Math.floor(up / 86400);
    var h = Math.floor(up % 86400 / 3600);
    var m = Math.floor(up % 86400 % 3600 / 60);
    var s = Math.floor(up % 86400 % 3600 % 60);
    
    return  (d > 0 ? d + "d " : "" ) +
            (h > 0 ? h + ":" : "") +
            (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") +
            (s < 10 ? "0" : "") + s;
}

function getLoad() {
    var load = os.loadavg();
    return load.map(function(v) { return v.toPrecision(2); });
}

function getMemory() {
    var free, total, used;
    free = os.freemem();
    total = os.totalmem();
    used = total - free;

    return {
        used: convertBytes(used),
        free: convertBytes(free),
        total: convertBytes(total)
    };
}

function getDisk(callback) {
    require('child_process').exec('df -k --total | grep total', function(err, resp){
        if (err) {
            console.log('Error retrieving disk usage: ' + err);
            callback(err, 0);
        } else {
            var raw = resp.split(" ").filter(function(v){
                return (v != '' && (v.indexOf('\n') == -1 ));
            }).slice(1,4).map( function(v){ return v * 1024; });

            // raw[] consist of ints due to the casting in map()
            var total = convertBytes(raw[0]);
            var used = convertBytes(raw[1]);
            var free = convertBytes(raw[2]);

            var data = { used: used, free: free, total: total};
            callback(null, data);
        }
    });

}

function getNet(callback) {
    require('child_process').exec('cat /proc/net/dev', function(err, resp){
        if (err) {
            console.log('Error retrieving net usage: ' + err);
            callback(err, 0);
        } else {
            var lines = resp.split('\n').slice(2);

            var interfaces = [];
            lines.forEach( function(line) {
                line = line.trim().split(" ").filter(function(v) { return v != ''; });

                if (line.length > 0){
                    interfaces.push({
                        name: line[0],
                        down: convertBytes(parseInt(line[1], 10)),
                        up: convertBytes(parseInt(line[9],10)),
                    });
                }
            });
            callback(null, interfaces);
        }
    });
}

function convertBytes(bytes){
    var types = ['B', 'KB', 'MB', 'GB', 'TB' ];
    for ( var i = 0; bytes >= 1024 && i < ( types.length-1); bytes /= 1024, i++);
    return (bytes.toFixed(2) + " " + types[i] );
}
