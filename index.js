var express = require('express')
var mongoDAO = require('./mongoDAO')

var app = express();


app.get('/listLecturers', (req, res) => {
    mongoDAO.getLecturers()
    .then((documents) => {
        res.send(documents)
    })
    .catch((error) => {
        res.send(error)
    })
    
})

// app.get('/listStudents', (req, res) => {
//     mongoDAO.getStudents()
//      //.then((documents) => {
//          //res.send(documents)
//          console.log("AOK")
//     // })
//      //.catch((error) => {
//       //   res.send(error)
//     // })
    
// })

// app.get('/listModules', (req, res) => {
//     //mongoDAO.getModules()
//     // .then((documents) => {
//     //     res.send(documents)
//     // })
//     // .catch((error) => {
//     //     res.send(error)
//     // })
    
// })

app.listen(3004, () => {
    console.log("Listening on port 3004")
})