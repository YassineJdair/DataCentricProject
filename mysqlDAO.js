var mysql = require('promise-mysql')

var pool;
var db;
var coll;

//pool
mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'collegeDB'
})
    .then((result) => {
        pool = result
    })
    .catch((error) => {
        console.log(error)
    })

//function get students
var getStudents = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from student')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//function to add student
var addStudents = function (sid, name, gpa) {
    return new Promise((resolve, rejected) => {
        var myQuery = {
            sql: 'insert into student values (?, ?, ?);',
            values: [sid, name, gpa]
        }

        pool.query(myQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                rejected(error)
            })
    })
}

//function to get module and list it
var getModule = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from module')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//function to edit moudle not complete
var editModule = function (mid, name, credits) {
    return new Promise((resolve, rejected) => {
        var myQuery = {
            sql: 'insert into student values (?, ?, ?);',
            values: [mid, name, credits]
        }

        pool.query(myQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                rejected(error)
            })
    })
}
//exports modules
module.exports = { getStudents, addStudents, getModule, editModule }