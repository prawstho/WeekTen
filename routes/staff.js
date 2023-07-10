const express = require('express');
const router = express.Router();
const { getStaff } = require('../services/staff.dal')

router.get('/', async (req, res) => {
    // const theStaff = [
    //     {first_name: 'Ross', last_name: 'Thorne', email: 'thorne@example.com',
    //     address: '23 Water Street', district: 'Downtown', postal_code: 'A1F3R4',  city: 'Torbay',
    //     phone: '7094561234'},
    //     {first_name: 'Laura', last_name: 'Scott', email: 'scott@example.com',
    //     address: '23 Water Street', district: 'Downtown', postal_code: 'A1F3R4', city: 'Paradise', 
    //     phone: '7094561234'},
    //     {first_name: 'Like', last_name: 'Walker', email: 'walker@example.com',
    //     address: '23 Water Street', district: 'Downtown', postal_code: 'A1F3R4', city: 'St.Johns',
    //     phone: '7094561234'}
    // ];
    try {
        let theStaff = await getStaff(); // from postgresql
        res.render('staff.ejs', {theStaff});
    } catch {
        res.render('503');
    }
});


module.exports = router