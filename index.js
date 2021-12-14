var express = require('express')
var mongoDAO = require('./mongoDAO')
var bodyParser = require('body-parser')
var mySQLDAO = require('./mysqlDAO')

//ejs layout
const ejs = require('ejs')
const { Console } = require('console')
var app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))



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



//get home page which then displays link to each page
app.get('/', (req, res) => {
    console.log("This Is Home Page")
    res.sendFile(__dirname + "/views/home.html")

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

//gets tudent
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

//lists lecturers
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

//post lecturer which allows you to add
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