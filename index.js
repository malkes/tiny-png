var tinify = require("tinify");
var path = require('path')
tinify.key = "SUA KEY DO TinyPNG";


var fs = require('fs');
var walkPath =  'PATH DA PASTA A SER VARRIDA';
var count = 0;
var totalSize = 0;
var walk = function (dir, done) {
    
    fs.readdir(dir, function (error, list) {
        if (error) {
            return done(error);
        }

        var i = 0;

        (function next () {
            var file = list[i++];

            if (!file) {
                return done(null);
            }
            
            file = dir + '/' + file;
            
            fs.stat(file, function (error, stat) {
        
                if (stat && stat.isDirectory()) {
                    walk(file, function (error) {
                        next();
                    });
                } else {
                    // do stuff to file here
                    var ext = file.substr(file.length - 3 )
                    if(ext == 'png' || ext == 'jpg'){
                        count++;
                        console.log(file);
                        console.log('Size: ' + stat['size']);
                        totalSize += stat['size']
                        var source = tinify.fromFile(file);
                        source.toFile(file);
                    }
                    
                    next();
                }
            });
        })();
    });
}

console.log('-------------------------------------------------------------');
console.log('processing...');
console.log('-------------------------------------------------------------');

walk(walkPath, function(error) {
    if (error) {
        throw error;
    } else {
        console.log('-------------------------------------------------------------');
        console.log('finished. ');
        console.log(count);
        var kb = totalSize / 1024
        var mb = kb / 1024
        console.log('Total Size. ' + mb  + ' Mb');
        console.log('-------------------------------------------------------------');
    }
});
