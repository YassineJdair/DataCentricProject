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




//get home page which then displays link to each page
app.get('/', (req, res) => {
    console.log("This Is Home Page")
    res.sendFile(__dirname + "/views/home.html")

})

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

//updates module using post
app.post('/updateModule/:mid', (req, res) => {
    mySQLDAO.editModule(req.body.mid, req.body.name, req.body.credits)
        .then((result) => {
            res.render('editModule', { editModule: result })
        })
        .catch((error) => {
            console.log(error)
        })
    // .catch((error) => {
    //     if (error.message.includes("11000")) {
    //         res.send("mid: " + req.body.mid + "cant be updated")
    //     } else {
    //         res.send(error.message)
    //     }
    // })

})

//edits module
app.get('/updateModule/:mid', (req, res) => {
    mySQLDAO.updatingModule(req.params.mid)
        .then((result) => {
            res.render('editModule', { editModule: result })
        })
        .catch((error) => {
            console.log(error)
        })
})

//List all of the students in a certain module
app.get('/listModules/:mid', (req, res) => {
    mySQLDAO.studentsModule(req.params.mid)
        .then((result) => {
            console.log(result)
            res.render('studentsInModule', { studentList: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//list students
app.get('/listStudents', (req, res) => {
    mySQLDAO.getStudents()
        .then((result) => {
            res.render('listStudents', { studentList: result })
        })
        .catch((error) => {
            res.send(error)

        })
})

//gets student
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

//deletes student
app.get('/listStudents/:sid', (req, res) => {
    mySQLDAO.deleteStudents(req.params.sid)
        .then((result) => {
            if (result.affectedRows == 0) {
                res.send("<h2> Student: " + req.params.sid + " cant be deleted.</h2>" + "<a href='/'>Home</a>")
            } else {
                res.send("<h2> Student: " + req.params.sid + " Deleted.</h2>" + "<a href='/'>Home</a>")
            }
        })
        .catch((error) => {
            if (error.code == "ER_ROW_IS_REFERENCED_2") {
                res.send("<h2> Error: " + error.errno + " cannot delete student with ID: " + req.params.sid + " as they are enrolled in a module</h2>" + "<a href='/'>Home</a>")
            }
            console.log(error.code)

        })
})

app.get('/listStudents/:sid', (req, res) => {
    res.render("delete student")
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

//gets lecturer
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

//listens on port 3004
app.listen(3004, () => {
    console.log("Listening on port 3004")
})