const { spawn } = require('child_process');
const os = require('os');

function getStockInfo(symbols, onSuccess, onError) {

    let python = 'python3';
    if (os.platform === 'win32') {
        python = 'py';
    }

    const service = spawn('py', ['get_stock_info.py', ...symbols]);

    service.stdout.on('data', function (message) {
        let data = JSON.parse(Buffer.from(message));
        onSuccess(data);
    });

    service.on('close', (code) => {
        if (code != 0) {
            onError();
        }
    });
}

module.exports = getStockInfo;