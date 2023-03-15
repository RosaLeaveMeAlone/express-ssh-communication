
const { Client } = require('ssh2');

const timedatectl = (resolve,reject) => {
    const conn = new Client();
    conn.on('ready', () => {
        console.log('Client :: ready');
        conn.exec('timedatectl', (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                conn.end();
            }).on('data', (data) => {
                console.log('STDOUT: ' + data);
                resolve(data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
                reject(data);
            });
        });
    }).connect({
        host: process.env.SSH_HOST,
        port: process.env.SSH_PORT,
        username: process.env.SSH_USER,
        password: process.env.SSH_PASSWORD,
    });
}

const timedatectlAsync = async () => {
    return new Promise((resolve,reject) => {
        const conn = new Client();
        conn.on('ready', () => {
            console.log('Client :: ready');
            conn.exec('timedatectl', (err, stream) => {
                if (err) throw err;
                stream.on('close', (code, signal) => {
                    conn.end();
                }).on('data', (data) => {
                    console.log('STDOUT: ' + data); 
                    console.log('LA DATA QUE ESTOY RESOLVIENDO' + data); 
                    resolve(data);
                }).stderr.on('data', (data) => {
                    console.log('STDERR: ' + data);
                    reject(data);
                });
            });
        }).connect({
            host: process.env.SSH_HOST,
            port: process.env.SSH_PORT,
            username: process.env.SSH_USER,
            password: process.env.SSH_PASSWORD,
        });
    });
}

module.exports = {
    timedatectlAsync,
}

const functionNormal = (resolve,reject) => {
    if(algo) {
        resolve('ok');
    }
    reject('error');
}

const functionPromesa = async () => {
    return new Promise((resolve,reject) => {
        functionNormal(resolve,reject);
    })
}