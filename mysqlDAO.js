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
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'insert into student values (?, ?, ?);',
            values: [sid, name, gpa]
        }

        pool.query(myQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//fucntion to delete students
var deleteStudents = function (sid) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'delete from student where sid = ?;',
            values: [sid]
        }

        pool.query(myQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
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


//Function to query the module database to list the students studying that module
var studentsModule = function (mid) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'select s.sid, s.name, s.gpa from student s left join student_module m on s.sid = m.sid where m.mid = ?;',
            values: [mid]
        }
        pool.query(myQuery)
            .then((data) => {
                resolve(data)
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
module.exports = { getStudents, addStudents, getModule, editModule, studentsModule, deleteStudents }