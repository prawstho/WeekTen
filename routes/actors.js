const express = require('express');
const router = express.Router();
const { getActors, getActorByActorId, addActor } = require('../services/actors.dal')

// is really http://localhost:3000/actors/
router.get('/', async (req, res) => {
    if(DEBUG) console.log("actors.GET");
    // const theActors = [
    //     {first_name: 'Youn', last_name: 'Yuh-jung'},
    //     {first_name: 'Laura', last_name: 'Dern'},
    //     {first_name: 'Regina', last_name: 'King'}
    // ];
    try {
        let theActors = await getActors(); // from postgresql
        if(DEBUG) console.log("inside the actors.route.GET success");
        if(DEBUG) console.log(theActors);
        res.render('actors', {theActors});
    } catch {
        res.render('503');
    }
});

// is really http://localhost:3000/actors/123
router.get('/:id', async (req, res) => {
    // const anActor = [
    //     {first_name: 'Regina', last_name: 'King'}
    // ];
    try {
        let anActor = await getActorByActorId(req.params.id); // from postgresql
        if (anActor.length === 0)
            res.render('norecord')
        else
            res.render('actor', {anActor});
    } catch {
        res.render('503');
    }
});

router.post('/', async (req, res) => {
    if(DEBUG) console.log("actors.POST");
    try {
        await addActor(req.body.firstName, req.body.lastName );
        res.redirect('/actors/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    } 
});

module.exports = router