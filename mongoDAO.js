const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

// const dbName = 'lecturersDb'
// const collName = 'lecturers'
var db;
var coll;

MongoClient.connect('mongodb://localhost:27017')
    .then((client) => {
        db = client.db('lecturersDB')
        coll = db.collection('lecturers')
    })
    .catch((error) => {
        console.log(error.message)
    })

var lecturersDB
var lecturers

// MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((client) => {
//         lecturersDB = client.db(dbName)
//         lecturers = lecturersDB.collection(collName)
//     })
//     .catch((error) => {
//         console.log(error)
//     })

// var getLecturers = function () {
//     return new Promise((resolve, reject) => {
//         var cursor = lecturers.find()
//         cursor.toArray()
//             .then((documents) => {
//                 console.log(documents)
//                 resolve(documents)
//             })
//             .catch((error) => {
//                 reject(error)
//             })
//     })
// }

function getLecturers(){
    return new Promise((resolve, reject)=>{
       cursor = coll.find()
       cursor.toArray()
       .then((data)=>{
            resolve(data)
       })
       .catch((error)=>{
            reject(error)
       })
    })
}

var addLecturers = function (_id, name, dept) {
    return new Promise((resolve, reject) => {
        coll.insertOne({ "_id": _id, "name": name, "dept": dept })
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

// var getStudents = function(){
//      return new Promise((resolve, reject) => {
//     //    var cursor = students.find()
//     //    cursor.toArray()
//     //     .then((documents) => {
//     //         console.log(documents)
//     //         resolve(documents)
//     //     })
//     //     .catch((error) => {
//     //         reject(error)
//     //     })
//      })
// }

module.exports = { getLecturers, addLecturers }