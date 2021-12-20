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
    .then((data) => {
        pool = data
    })
    .catch((error) => {
        console.log(error)
    })

//function get students
var getStudents = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from student')
            .then((data) => {
                resolve(data)
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
            sql: 'delete from student where sid = (?);',
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
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


//Function to query the module database to list the students studying that module
var studentsModule = function (mid) {
    return new Promise((resolve, reject) => {
        pool.query(`select s.sid, s.name, s.gpa from student s left join student_module m on s.sid = m.sid where m.mid = "${mid}"`)
            // var myQuery = {
            //     sql: `select s.sid, s.name, s.gpa from student s left join student_module m on s.sid = m.sid where m.mid = "${mid}"`,
            //     values: [sid]
            // }
            // pool.query(myQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
// add the update module here
var updatingModule = function (mid) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'select * from module where mid=?',
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
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'update module set name = ?, credits = ? where mid=?',
            values: [mid, name, credits]
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

//exports modules
module.exports = { getStudents, addStudents, getModule, editModule, updatingModule, studentsModule, deleteStudents }