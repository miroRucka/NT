var fs = require('fs');
var http = require('http');

var dirArg = process.argv[2];
var timeoutArg = process.argv[3];

var timeout = timeoutArg || (60 * 1000);
var baseDir = dirArg || "d:/tmp/";

process.on('uncaughtException', function (err) {
    console.error('Caught exception: ', err);
});

var startHttpServer = function () {
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end('{"nt":true}');
    }).listen(9615);
};

var dateFormat = function (date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var month = Number(monthIndex) + 1;
    var result = day + "_" + month + "_" + year;
    return result;
};

var makeDirIfNotExist = function (dirName) {
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
    }
};

var writeLogFile = function (path) {
    fs.open(path, "wx", function (err, fd) {
        fs.close(fd, function (err) {
        });
    });
};

var job = function () {
    var date = new Date();
    var dirName = baseDir + dateFormat(date);
    makeDirIfNotExist(dirName);
    writeLogFile(dirName + "/" + getFileFormat(date));
    startJob();
};

var getFileFormat = function (date) {
    var result = date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds();
    return result;
};

var startJob = function () {
    setTimeout(job, timeout);
};

job();
startHttpServer();
