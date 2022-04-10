/*const { Pool } = require('pg');
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
        console.log('Connection to database is succesful to calculate stats');
    }
});*/

const toDate = (date) => {
    let day = date.getDate().toString();
    if (day.length == 1) {
        day = '0' + day;
    }

    let month = (date.getMonth() + 1).toString();
    if (month.length == 1) {
        month = '0' + month;
    }


    return `${date.getFullYear()}-${month}-${day}`;
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

/*const calculateStats = async (id) => {
    const date = new Date();
    const result = pool.query('SELECT button_id, start_time, end_time FROM user_data WHERE user_id=$1 AND day=$2', [id, toDate(date)]);
    console.log(result.rows);
    //const answers = await pool.query('SELECT answer FROM answers WHERE button_id=$1 AND time>=$2 AND time <=$3', [button_id, start_time, end_time]);

    //console.log(answers.rows);
}*/


module.exports = {
    toDate,
    toTime
}