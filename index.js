var express = require('express')
var mongoDAO = require('./mongoDAO')
var bodyParser = require('body-parser')
var mySQLDAO = require('./mysqlDAO')


const ejs = require('ejs')
var app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))


// app.get('/', (req,res) =>{
//     res.redirect("localhost:3004")
// })


//list modules
app.get('/listModules', (req, res) => {
    mySQLDAO.getModule()
        // .then((result) => {
        //     res.send(result)
        .then((result) => {
            res.render('listModules', { moduleList: result })
        })
        .catch((error) => {
            res.send(error)

        })
})

//get module
app.get('/listModules', (req, res) => {
    res.render("listModules")
})

//edit module
app.post('/listModules', (req, res) => {
    mySQLDAO.editModule(req.body.sid, req.body.name, req.body.gpa)
        .then((result) => {
            res.redirect("/listModules")
        })
        .catch((error) => {
            if (error.message.includes("11000")) {
                res.send("mid: " + req.body.mid + " already exists")
            } else {
                res.send(error.message)
            }
        })

})










































//list students
app.get('/listStudents', (req, res) => {
    mySQLDAO.getStudents()
        // .then((result) => {
        //     res.send(result)
        .then((result) => {
            res.render('listStudents', { studentList: result })
        })
        .catch((error) => {
            res.send(error)

        })
})

//getstudent
app.get('/addStudent', (req, res) => {
    res.render("addStudent")
})

//add student
app.post('/addStudent', (req, res) => {
    mySQLDAO.addStudents(req.body.sid, req.body.name, req.body.gpa)
        .then((result) => {
            res.redirect("/listStudents")
        })
        .catch((error) => {
            if (error.message.includes("11000")) {
                res.send("SID: " + req.body.sid + " already exists")
            } else {
                res.send(error.message)
            }
        })

})

//list lecturers
app.get('/listLecturers', (req, res) => {
    mongoDAO.getLecturers()
        .then((data) => {
            res.render('listLecturers', { lecturersList: data })
        })
        .catch(() => {
            res.send('error')
        })
})

app.get('/addLecturer', (req, res) => {
    res.render("addLecturer")
})

//post lecturer
app.post('/addLecturer', (req, res) => {
    mongoDAO.addLecturers(req.body._id, req.body.name, req.body.dept)
        .then((result) => {
            res.redirect("/listLecturers")
        })
        .catch((error) => {
            if (error.message.includes("11000")) {
                res.send("_ID: " + req.body._id + " already exists")
            } else {
                res.send(error.message)
            }
        })

})

app.listen(3004, () => {
    console.log("Listening on port 3004")
})