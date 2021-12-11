var express = require('express')
var mongoDAO = require('./mongoDAO')
var bodyParser = require('body-parser')

const ejs = require('ejs')
var app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))


// app.get('/lecturers', (req, res) => {
//     mongoDAO.getLecturers()
//     .then((documents) => {
//         res.send(documents)
//     })
//     .catch((error) => {
//         res.send(error)
//     })
    
// })

app.get('/lecturers', (req, res) => {
    mongoDAO.getLecturers()
      .then((data) => {
        res.render('listlecturers', { lecturerstList: data })
      })
      .catch(() => {
        res.send('error')
      })
  })

app.get('/addLecturer', (req, res) => {
    res.render("addLecturer")
})

app.post('/addLecturer', (req, res) =>{
    mongoDAO.addLecturers(req.body._id, req.body.name, req.body.dept)
    .then((result) =>{
        res.redirect("/lecturers")
    })
    .catch((error) =>{
        if (error.message.includes("11000")){
            res.send("_ID: " + req.body._id + " already exists")
        }else {
            res.send(error.message)
        }
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