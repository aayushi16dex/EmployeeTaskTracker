const express = require('express')
const router = express.Router()
const empDetails = require('../models/empDetails')
const empTaskTracker = require('../models/empTasks')

/* Fetches single employees login details and open the portal accordingly */
router.post('/verify', async (req, res) => {
    try {
        const emp = await empDetails.findOne({ "username": req.body.username }, { username: 1, password: 1, role: 1, empId:1 });
        if (req.body.password === emp.password) {
            console.log("Successful");
            if (emp.role == "employee"){
                const empTaskData = await empTaskTracker.aggregate([ { $match: { empId: emp.empId} }, { $group: {_id: "$taskType", sum: { $sum: "$timeSpent" }}} ]);

                res.status(200).render('employeeDashboard', {empTaskData: empTaskData, id: emp.empId});
            }
            else if (emp.role == "admin"){
                const allempRecord = await empDetails.find({}, { empId: 1, empName: 1, _id: 0});
                res.status(200).render('adminDashboard', {employeeList: allempRecord});
            }
            else{
                console.log("error")
                res.status(401).render('home');
            }
        }
        else {
            res.render('home');
        }


    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})


/* Change an employees password */
router.patch('/pc/:emailId', async (req, res) => {
    try {
        const emp = await empDetails.updateOne({ "emailId": req.params.emailId }, { $set: { "password": req.body.password } });
        res.json(emp)
    } catch (err) {
        res.send('Error: ' + err)
    }

})

module.exports = router