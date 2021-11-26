const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';

const dbName = 'lecturersDB'
const collName = 'lecturers'

var lecturersDB
var lecturers

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((client) => {
        lecturersDB = client.db(dbName)
        lecturers = lecturersDB.collection(collName)
    })
    .catch((error) => {
        console.log(error)
    })

var getLecturers = function(){
    return new Promise((resolve, reject) => {
       var cursor = lecturers.find()
       cursor.toArray()
        .then((documents) => {
            console.log(documents)
            resolve(documents)
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

module.exports = {getLecturers}