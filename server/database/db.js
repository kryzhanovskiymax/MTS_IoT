const { Pool } = require('pg');
const pool = new Pool({
    user: 'makskryzhanovskiy',
    host: 'localhost',
    database: 'makskryzhanovskiy',
    password: 'password',
    port: 5432
});

pool.connect((err, client, release) => {
    if (err) {
        console.log('Error accured');
    } else {
        console.log('Connection to database is succesful');
    }
});

const insertUserIntoUserData = async (user_id, test_id, button_id, day, start, end) => {
        try {
            const response = await pool.query('INSERT INTO user_data (user_id, test_id, button_id, day, start_time, end_time) VALUES($1, $2, $3, $4, $5, $6)', 
                                [user_id, test_id, button_id, day, start, end]);
            return response
        } catch(e) {
            return e;
        }
    }

const updateUserDataStart = async(user_id, day, start) => {
    try {
        console.log(day);
        const response = await pool.query('UPDATE user_data SET start_time=$1 WHERE user_id = $2 AND day=$3', [start, user_id, day]);
        return response;
    } catch(e) {
        return e;
    }
}


const updateUserDataEnd = async(user_id, day, start) => {
    try {
        console.log(day);
        const response = await pool.query('UPDATE user_data SET end_time=$1 WHERE user_id = $2 AND day=$3', [start, user_id, day]);
        return response;
    } catch(e) {
        return e;
    }
}

const selectUserFromUserData = async (user_id, date) => {
        try {
            if (!user_id) {
                throw new Error('User id is not stated');
            }
            
            const result = await pool.query('SELECT * FROM user_data WHERE user_id=$1 AND day=$2', [user_id, date]);
            return result;
        } catch(e) {
            return e;
        }
}

const insertClickIntoAnswers = async (button_id, answer, time) => {
    try{
        const result = await pool.query('INSERT INTO answers (button_id, answer, time) VALUES($1, $2, $3)', [button_id, answer, time]);
        return result
    } catch(e) {
        return e;
    }
} 

const insertIdealResults = async (test_id, answers) => {
    try {
        const result = await pool.query('INSERT INTO ideal_results (test_id, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [test_id, answers[0], answers[1], answers[2], answers[3], answers[4], answers[5], answers[6], answers[7], answers[8], answers[9]]);
        return result;
    } catch(e) {
        return e;
    }
}

const getIdealResults = async (test_id) => {
    try {
        const result = await pool.query('SELECT ans1, ans2, ans3, ans4 FROM ideal_result WHERE test_id=$1', [test_id]);
        return result;
    } catch(e) {
        return e;
    }
}

const insertAllResults = async (user_id, day, time_spent, fails) => {
    try {
        const result = await pool.query('INSERT INTO all_res (user_is, day, time_spent, fails) VALUES($1, $2, $3, $4)', [user_id, day, time_spent, fails]);
        return result;
    } catch(e) {
        return e;
    }
}

const getUserAllResults = async (user_id, day) => {
    try {
        const result = await pool.query('SELECT time_spent, fails FROM all_res WHERE user_id=$1 AND day=$2', [user_id, day]);
    } catch(e) {

    }
}

module.exports = {
    insertUserIntoUserData,
    selectUserFromUserData,
    updateUserDataStart,
    updateUserDataEnd,
    insertClickIntoAnswers,
    insertIdealResults,
    getIdealResults,
    insertAllResults,
    getUserAllResults
}