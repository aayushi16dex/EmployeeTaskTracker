const express = require('express')
const router = express.Router()
const empTaskTracker = require('../models/empTasks')

/* Fetches all employees task details */
router.get('/', async (req, res) => {
    try {
        console.log("all emps")
        const task = await empTaskTracker.find()
        res.json(task)
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})


/** Redirect to add task page */
router.get('/addingTask', async (req, res) => {
    try {
        res.status(200).render('employeeAddTask');
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

/* Fetches single employees task details */
router.get('/id=:empId', async (req, res) => {
    try {
        console.log("empid inside")
        const task = await empTaskTracker.find({ "empId": req.params.empId });
        res.json(task)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

/* Post an employees task details */
router.post('/addEmpTask', async (req, res) => {

    console.log("adding")
    const { empId, taskDescription, taskType, startTime, timeSpent } = req.body;
    const task = new empTaskTracker({empId,taskDescription, taskType, startTime, timeSpent});
    try {
        const t1 = await task.save();
        res.status(200).render('employeeDashboard');
        // res.json(t1)

    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/* Data for charts */
router.get('/stats/id=:empId', async (req, res) => {
    try {
        console.log("charts");
        const task = await empTaskTracker.aggregate([ { $match: { empId: req.params.empId} }, { $group: {_id: "$taskType", sum: { $sum: "$timeSpent" }}} ]);
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})



/* Update tasks */
router.patch('/id/:empId', async(req,res)=> {
    try{
        const task = await empTaskTracker.findById(req.params.id) 

    
        task.empId = req.body.empId, 
        task.taskDescription = req.body.taskDescription,
        task.taskType = req.body.taskType,
        task.startTime = req.body.startTime,
        task.timeSpent = req.body.timeSpent

        const t1 = await task.save()
        res.json(t1)   
    }catch(err){
        res.status(400).json({ message: err.message });
    }

})

/* Delete an employees task details */
router.delete('/id/:empId', async(req,res)=> {
    try{
        const task = await empTaskTracker.findById(req.params.id) 
        const t1 = await task.delete()
        res.json(t1)   
    }catch(err){
        res.status(400).json({ message: err.message });
    }

})

module.exports = router