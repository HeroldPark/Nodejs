if(cluster.isMaster) {
    var worker = cluster.fork();
    worker.on('message', function(message) {
        console.log('master received : ', message);
    });

    clusetr.on('online', function(worker) {
        worker.send({message:'Hello Worker'});
    });
}
else {
    var worker = clusetr.worker;

    worker.on('message', function(message) {
        process.send({message:'Fine thank you!'});
    });
}