const { response } = require('express');

const devices = async(req, res = response) => {
    res.json({
        'msg' : 'Devices'
    });
}


module.exports = {
    devices,
}