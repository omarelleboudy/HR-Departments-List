// We create a Schema in the database for the Department
const mongoose = require('mongoose');
const Joi = require('joi');
const Dept = mongoose.model('Dept', new mongoose.Schema({
    did: {
        type: Number
    },
    dname: {
        type: String
    },
    capacity: {
        type: Number
    },
    status: {
        type: String
    }
  }));
  // Validating the Department name for the get and post requests
  function validateDepartment(dept) {
    const schema = {
      did: Joi.number().min(1).required(),
      dname: Joi.string().min(3).required(),
      capacity: Joi.number().min(2).required(),
      status: Joi.string().min(3)

    };
  
    return Joi.validate(dept, schema);
  }
  
  exports.Dept = Dept; 
  exports.validate = validateDepartment;