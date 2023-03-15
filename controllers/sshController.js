const { response } = require('express');
const { timedatectlAsync } = require('../helpers/ssh');

const devices = async(req, res = response) => {
    
    console.log('Primero de todo');
    
    console.log('Host:',process.env.SSH_HOST);
    const timedata = await timedatectlAsync();
    let data = timedata.toString();
    console.log('data',data);
    console.log('data.tostring',data.toString());
    console.log('Antes del json');
    res.json({
        'msg' : 'DevicesEDIT',
        data: data,
    });
}


module.exports = {
    devices,
}