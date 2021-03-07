var async = require('async');

async.parallel([
        function task1(callback) {
            callback(null, 'value');
        },
        function task2(arg, callback) {
            callback(null, 'value1', 'value2');
        },
        function task3(arg1, arg2, callback) {
            callback(null, 'result');
        }
    ],
    function(err, results) {
        console.log('모든 타스크 종료, 결과 : ', results);
        // ['타스크1 결과', '타스크 2 결과', '타스크 3 결과']
    }
);