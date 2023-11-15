const express = require('express');
const router = express.Router();
const { getCustomers } = require('../services/customers.dal')

router.get('/', async (req, res) => {
    try {
        let theCustomers = await getCustomers(); // from postgresql
        res.render('customers', { customers: theCustomers } )
    } catch {
        res.render('503');
    }
});

module.exports = router