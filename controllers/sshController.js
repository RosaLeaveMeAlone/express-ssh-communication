const { response } = require('express');
const { readFileSync } = require('fs');

const { Client } = require('ssh2');

const devices = async(req, res = response) => {

    const conn = new Client();
    console.log('Primero de todo');
    console.log('Host:',process.env.SSH_HOST);
    await conn.on('ready', () => {
        console.log('Client :: ready');
        conn.exec('timedatectl', (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
            }).on('data', (data) => {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).connect({
        host: process.env.SSH_HOST,
        port: process.env.SSH_PORT,
        username: process.env.SSH_USER,
        password: process.env.SSH_PASSWORD,
    });
    console.log('Antes del json');
    res.json({
        'msg' : 'Devices'
    });
}


module.exports = {
    devices,
}