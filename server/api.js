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
const { Router } = require('express');

const toDate = (date) => {
    let day = date.getDate().toString();
    if (day.length == 1) {
        day = '0' + day;
    }

    let month = (date.getMonth() + 1).toString();
    if (month.length == 1) {
        month = '0' + month;
    }


    return `${date.getFullYear()}-${day}-${month}`;
}

const toTime = (date) => {
    let hours = date.getHours();
    if (hours.length == 1) {
        hours = '0' + hours;
    }

    let minutes = date.getMinutes();
    if (minutes.length == 1) {
        minutes = '0' + minutes;
    }

    let seconds = date.getMinutes();
    if (seconds.length == 1) {
        seconds = '0' + seconds;
    }
    return `${toDate(date)} ${hours}:${minutes}:${seconds}`;
}

const router = Router();

//GENERATE button clicked
router.get('/', async (req, res) => {
    try {
        const { id } = req.body;
        const user_insertion = await insertUserIntoUserData(id, null, 1, toDate(new Date()), null, null);
        const test_arr = [1, 2, 2, 3, 3, 2, 2, 2, 1, 1];
        const test_id = Math.floor(Math.random() * 1000);
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
        const result = await updateUserDataStart(id, toDate(new Date()), toTime(new Date()));
        
        res.send(200).json({message: "test started"});
        return result
    } catch(e) {
        res.status(400).json({error: e.message})
    }
});

//MTS button clicked
router.post('/res', async (req, res) => {
    try {
        const { click_type } = req.body;
        const result = await insertClickIntoAnswers(123, Int(click_type), toTime(new Date()));
        res.send(200).message({message: "OK"});
        return result;
    } catch(e) {
        res.send(400).json({error: e.message});
    }
});

//Test has ended
router.put('/', async (req, res) => {
    try {
        const { id } = req.body;
        const result = await updateUserDataEnd(id, toDate(new Date()), toTime(new Date()));
    } catch(e) {
        return res.send(400).json({error: e.message});
    }
});

module.exports = router;












