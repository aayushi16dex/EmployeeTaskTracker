const express = require('express')
const router = express.Router()
const dropDown = require('../models/dropDown')

/* Fetches all values of department for dropdown */
router.get('/', async(req,res) =>{
    try{
        console.log("Drop")
        const user = await dropDown.find();
        res.json(user);
    }
    catch(err){
        res.send("Error " + err)
    }
});

router.post('/', async (req, res) => {

    const { deptId, department } = req.body;
    const task = new dropDown({deptId, department });
    try {
        const t1 = await task.save()
        res.json(t1)

    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router