const {
    insertUserIntoUserData,
    selectUserFromUserData,
    insertClickIntoAnswers,
    insertIdealResults,
    getIdealResults,
    insertAllResults,
    getUserAllResults
} = require('./database/db.js');
const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { id } = req.body;
        const date = new Date;
        insertUserIntoUserData(id, null, 1, date.toDateString, null, null);

        const test_arr = [1, 2, 2, 3];
        const test_id = Math.floor(Math.random() * 1000);
        res.status(200).json({test: test_arr});
    } catch(e) {
        res.status(400).json({error: e.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const { id, start } = req.body;
        
    } catch(e) {

    }
})

module.exports = router;




