// Simply importing the Schema and Validator from the model file
const { Dept, validate } = require('../model/department.model');

const express = require('express');
const router = express.Router();


// This is the get method for getting all Departments in our database
router.get("/", async (req,res)=>
{   // We get the Departments from the database and sort them by the id
    const dept = await Dept.find().sort('did');
    res.send(dept);
});
// This is a get method for each department, using the id
router.get("/:id", async (req,res)=>
{   
    // Find the department by the given ID
    const dept = await Dept.findById(req.params.id);
     // If the ID is not found, display the message with an error 404
    if (!dept) return res.status(404).send("The Department with the given ID cannot be found.");
    // If it's found, simply return it
    res.send(dept);
});
// This is a method to update the Department list and add new Departments
router.post("/add", async (req,res)=>
{
    // Validation
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    
    let dept = new Dept({
       did: req.body.did,
       dname: req.body.dname,
       capacity: req.body.capacity,
       status: req.body.status
      });
    // Add the new Department to the list of Departments in the database
    dept = await dept.save();
    // Respond with the updated Department
    res.send(dept);
});
// This is a method to update a Deparmtent. For example, changing a Department's name
router.post("/update/:id", async (req,res)=>
{
    // Validation of input
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // We serach by id for the Department in the database
    const dept = await Dept.findByIdAndUpdate(req.params.id, 
      { did: req.body.did,
      dname: req.body.dname,
      capacity: req.body.capacity,
      status: req.body.status
      },
      { new: true} )
    if(!dept) return res.status(404).send("The Department with the given ID cannot be found.");
    // If all is well, simply update the Deparment with the given paramters
    res.send(dept);
});
// This is a method to delete a Deparment from the list
router.delete("/delete/:id", async (req,res)=>
{
    // Look for a Department in the database by ID and delete it if found.
    const dept = await Dept.findByIdAndRemove(req.params.id);
    // Error if not found
    if(!dept) return res.status(404).send("The Department with the given ID cannot be found.");
    
    // if all is well, simply delete then return the Department to the client
    res.send(dept);
});
module.exports = router;