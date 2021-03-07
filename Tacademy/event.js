// process.on('exit', function() {
//     console.log('exit event');
// });

// process.once('exit', function() {
//     console.log('exit event once');
// });

// process.emit('exit');
// process.emit('exit', 0);
// process.emit('exit', 1)

process.on('uncaughtException', function(code){
    console.log('uncaughtException');
});
sayHello();