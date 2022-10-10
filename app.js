const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb+srv://admin:fliprRoot@flipr-database.vtolarb.mongodb.net/employeeDB'

const app = express()
mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection
con.on('open', () => {               //opens the connection
    console.log('connected...')
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* USER LOGIN CREDENTIAL */
const userRouter = require('./routes/userCredential');
app.use('/login', userRouter);

/* EMPLOYEE PERSONAL DETAILS */
const empDetailsRouter = require('./routes/empDetails');
app.use('/employee', empDetailsRouter);

/* EMPLOYEE TASK DETAILS */
const empTaskRouter = require('./routes/empTasks');
app.use('/empTasks', empTaskRouter);

/* DROPDOWN MENU */
const dropdownRouter = require('./routes/dropDown');
app.use('/dropdown', dropdownRouter);

/* FRONT-END CONNECTION */
// Static Files

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));


//Set views
app.set('views', './views');
app.set('view engine', 'ejs');

//get views... by default this page opens
app.get('', (req, res) => {
    res.render('home');
})

/** Server */

app.listen(9000, () => {
    console.log("server started");
})
