const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/ValidateFields');
const { devices } = require('../controllers/sshController');


const router = Router();

router.post('/devices',[
    check('token', 'token is required').not().isEmpty(),
    validateFields,
],devices );

module.exports = router;