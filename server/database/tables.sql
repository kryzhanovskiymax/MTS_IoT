CREATE TABLE user_data (
    user_id INTEGER,
    test_id INTEGER,
    button_id INTEGER,
    day DATE,
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

CREATE TABLE ideal_results (
    test_id INTEGER,
    ans1 INTEGER,
    ans2 INTEGER,
    ans3 INTEGER,
    ans4 INTEGER,
    ans5 INTEGER,
    ans6 INTEGER,
    ans7 INTEGER,
    ans8 INTEGER,
    ans9 INTEGER,
    ans10 INTEGER,
    ans11 INTEGER,
    ans12 INTEGER,
    ans13 INTEGER,
    ans14 INTEGER,
    ans15 INTEGER
);

CREATE TABLE answers (
    button_id INTEGER,
    answer INTEGER,
    time DATE
);

CREATE TABLE all_res (
    user_id INTEGER,
    day DATE,
    time_spent INTEGER,
    fails INTEGER
);