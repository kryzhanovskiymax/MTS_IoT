const {
    insertUserIntoUserData,
    selectUserFromUserData,
    updateUserDataStart,
    updateUserDataEnd,
    insertClickIntoAnswers,
    insertIdealResults,
    getIdealResults,
    insertAllResults,
    getUserAllResults
} = require('./database/db.js');

const { 
    toDate,
    toTime
} = require('./database/stats.js')
const { Router } = require('express');



const router = Router();

//GENERATE button clicked
router.post('/generator', async (req, res) => {
    try {
        const { id } = req.body;
        const test_id = Math.floor(Math.random() * 10000);
        console.log(id);
        const user_insertion = await insertUserIntoUserData(id, test_id, 234, toDate(new Date()), null, null);
        let test_arr = [];
        for (let i = 0; i < 15; ++i) {
            test_arr[i] = Math.floor(Math.random() * 3) + 1;
        }
        const test_insertion = await insertIdealResults(test_id, test_arr);
        res.status(200).json({test: test_arr});
    } catch(e) {
        res.status(400).json({error: e.message});
    }
});

//START button clicked
router.post('/', async (req, res) => {
    try {
        
        const { id } = req.body;
        console.log(JSON.stringify(req.body));
        const result = await updateUserDataStart(id, toDate(new Date()), toTime(new Date()));
        
        res.status(200).json({message: "test started"});
        return result
    } catch(e) {
        res.status(400).json({error: e.message})
    }
});

//MTS button clicked
router.post('/res', async (req, res) => {
    try {
        const { click_type } = req.body;
        const result = await insertClickIntoAnswers(123, click_type, toTime(new Date()));
        res.status(200).json({message: "OK"});
        return result;
    } catch(e) {
        res.status(400).json({error: e.message});
    }
});

//Test has ended
router.put('/', async (req, res) => {
    try {
        const { id } = req.body;
        const result = await updateUserDataEnd(id, toDate(new Date()), toTime(new Date()));
        res.status(200).json({message: "Test ended"});
    } catch(e) {
        return res.status(400).json({error: e.message});
    }
});

module.exports = router;












