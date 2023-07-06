const express = require('express');
const router = express.Router();

// this root is actually /tasks
router.get('/', (req, res) => {
    res.write('What do we do today?');
    res.end();
});

module.exports = router