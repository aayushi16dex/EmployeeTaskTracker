const express = require('express')
const router = express.Router()
const empDetails = require('../models/empDetails')

/* Fetches all employees details */
router.get('/getAllEmployees', async (req, res) => {
    try {
        const emp = await empDetails.find();
        res.json(emp);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

/* Fetches all employees details */
router.get('/displayEmployeeDashboard', async (req, res) => {
    try {

        res.status(200).render('employeeDashboard');
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})




router.get('/displayAddEmployeePage', async (req, res) => {
    try {
        res.status(200).render('addEmployee');
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.get('/displayAdminDashboardPage', async (req, res) => {
    try {
        const allempRecord = await empDetails.find({}, { empId: 1, empName: 1, _id: 0 });
        res.status(200).render('adminDashboard', { employeeList: allempRecord });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

/* Fetches single employees profile details */
router.get('/id=:empId', async (req, res) => {
    try {
        const emp = await empDetails.find({ "empId": req.params.empId });
        res.json(emp)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

/* Post an employees details */
router.post('/addEmployee', async (req, res) => {

    /* Framing employee ID */
    /* emp id = year of joining + department + employee number */

    console.log(req.body);
    var doj = req.body.dateOfJoining;
    var doj1 = doj.substr(2, 2);

    var dept = req.body.department;
    console.log(dept);
    var deptCount = await empDetails.find({ "department": dept }).count();
    console.log(deptCount);
    deptCount = deptCount + 1;

    let deptCountToString = deptCount.toString();


    // If length of number string is less than 3 then add leading 0s
    if (deptCountToString.length < 3) {
        for (let i = deptCountToString.length; i < 3; i++) {
            var empNum = '0' + deptCountToString;
        }
    }

    switch (dept) {
        case "IT services":
            var dept1 = "its";
            break;
        case "Research and development":
            var dept1 = "rde";
            break;
        case "Accounts and Finance":
            var dept1 = "acc";
            break;
        case "HR":
            var dept1 = "hrd";
            break;
        case "Sales and marketing":
            var dept1 = "slm";
            break;
        case "Infrastructures":
            var dept1 = "inf";
            break;
        case "Product development":
            var dept1 = "pde";
            break;
        case "Admin department":
            var dept1 = "adm";
            break;
        case "Cyber Security":
            var dept1 = "cys";
            break;
        default:
            var dept1 = "ext";
            break;
    }

    var id = doj1 + dept1 + empNum;
    console.log("id: " + id);
    // console.log(emp)

    const emp = new empDetails({
        empId: `${id}`,     //manually
        empName: req.body.empName,
        emailId: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        department: req.body.department,
        dateOfJoining: req.body.dateOfJoining,
        username: req.body.emailId,     //manually
        password: `${id}`,              //manually
        role: "employee"                // manually
    })

    try {
        const u1 = await emp.save()
        // res.json(u1)
        const allempRecord = await empDetails.find({}, { empId: 1, empName: 1, _id: 0 });
        res.status(200).render('adminDashboard', { employeeList: allempRecord });

    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// /* Delete an employees details */
router.delete('/id=:empId', async (req, res) => {
    try {
        const user = await empDetails.remove({ "empId": req.params.empId });
        res.json(user)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

})


module.exports = router