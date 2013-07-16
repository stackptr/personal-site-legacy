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
            uptime: os.uptime(),
            loadavg: os.loadavg(),
            memory: {
                free: os.freemem(),
                total: os.totalmem(),
                used: os.totalmem() - os.freemem()
            },
            disk: results[0],
            net: results[1],
        };
        if (err) return fn(err);
        
        return fn(null, stats);
    });
};

function getDisk(fn) {
    require('child_process').exec('df -k --total | grep total', function(err, resp){
        if (err) {
            console.log('Error retrieving disk usage: ' + err);
            fn(err, 0);
        } else {
            var raw = resp.split(" ").filter(function(v){
                return (v != '' && (v.indexOf('\n') == -1 ));
            }).slice(1,4).map( function(v){ return v * 1024; });

            var total = raw[0];
            var used = raw[1];
            var free = raw[2];

            var data = { used: used, free: free, total: total};
            fn(null, data);
        }
    });

}

function getNet(fn) {
    require('child_process').exec('cat /proc/net/dev', function(err, resp){
        if (err) {
            console.log('Error retrieving net usage: ' + err);
            fn(err, 0);
        } else {
            var lines = resp.split('\n').slice(2);

            var interfaces = [];
            lines.forEach( function(line) {
                line = line.trim().split(" ").filter(function(v) { return v != ''; });

                if (line.length > 0){
                    interfaces.push({
                        name: line[0],
                        down: parseInt(line[1], 10),
                        up: parseInt(line[9],10),
                    });
                }
            });
            fn(null, interfaces);
        }
    });
}

