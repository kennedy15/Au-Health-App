/*File will have all of the methods for database querying*/
const mysql = require('mysql');

//Create a new user in DB
function createNewUserInDB(hashedEmail, hashedPassword, isAdmin) {
    return new Promise((resolve, reject) => {
        const mySqlConnection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: "root",
            // password: process.env.DB_PASS,
            database: "backendSchemas"
        });
        mySqlConnection.connect(function(err) {
            if (err) reject(err);
            console.log("Connected!");
            let sqlQuery = `INSERT INTO User(UserEmail,Password,UUID,UserType) VALUES ("${hashedEmail}","${hashedPassword}",UuidToBin(UUID()),${isAdmin?2:1})`;
            mySqlConnection.query(sqlQuery, function(err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                resolve("success");
            });
        });
    });
}

//Get User Information from user based on Email
function getUserInfoFromEmail(hashedEmail) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `SELECT UuidFromBin(UUID) UUID,UserType,UserVerified,ConsentFormSigned,UserAccountDisabled FROM User WHERE UserEmail='${hashedEmail}'`;
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((resolve, reject) => {
        return resolve;
    })
}

function getUserHashedPasswordFromEmail(hashedEmail) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `SELECT Password FROM User WHERE UserEmail = '${hashedEmail}'`;
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((resolve, reject) => {
        return resolve;
    })
}

//Insert Dares into table
function createDare() {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `INSERT INTO Dares(Dare, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES ("Dare", 5, 5, 2, 2)`;
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((resolve, reject) => {
        return resolve;
    })
}

//Insert Truths into table
function createTruths() {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `INSERT INTO Truths(Truth, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES ("Truth", 1, 2, 3, 4)`;
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((resolve, reject) => {
        return resolve;
    })
}

//Insert Questions into table
function createQuestions() {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `INSERT INTO Questions(QuestionTitle, Question, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES ("Questions", "What is your name?", 2, 1, 10, 2)`;
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((resolve, reject) => {
        return resolve;
    })
}
/**************************Shortcuts to create connection************/
function createMySqlConnection() {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: "root",
        // password: process.env.DB_PASS,
        database: "backendSchemas"
    });
}

function queryViaMySqlConnection(sqlConnection, sqlQuery) {
    return new Promise((resolve, reject) => {
        sqlConnection.connect(function(err) {
            if (err) reject(err);
            sqlConnection.query(sqlQuery, function(err, result, fields) {
                if (err) reject(err);
                else if (!result[0]) resolve(undefined)
                else resolve(result[0]);
            });
        });
    });
}

module.exports.createNewUserInDB = createNewUserInDB;
module.exports.getUserInfoFromEmail = getUserInfoFromEmail;
module.exports.getUserHashedPasswordFromEmail = getUserHashedPasswordFromEmail;
module.exports.createDare = createDare;
module.exports.createTruths = createTruths;
module.exports.createQuestions = createQuestions;