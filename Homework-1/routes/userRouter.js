const express = require('express');
const Joi = require('joi');
const router = express.Router();

const users = [
   {
      id: 1,
      name: 'Le Quoc Huy',
      phoneNumber: '0982444222',
      email: 'likenaked2210@gmail.com',
      gender: 'Male',
      age: 22,
   },
];

const validateData = (data) => {
   const schema = Joi.object({
      name: Joi.string()
         .regex(/[^0-9]$/)
         .required(),
      phoneNumber: Joi.number().min(10).required(),
      email: Joi.string()
         .email({ tlds: { allow: ['com', 'net', 'vn'] } })
         .required(),
      gender: Joi.string()
         .regex(/Male$|Female$|Other$/)
         .required(),
      age: Joi.number().integer().max(199).required(),
   });
   return schema.validate(data);
};

router.get('/', (req, res) => res.send(users));
router.post('/', (req, res) => {
   const { error } = validateData(req.body);
   if (error) return res.status(401).send(error.details[0].message);
   const newData = {
      id: users.length + 1,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      gender: req.body.gender,
      age: req.body.age,
   };
   users.push(newData);
   res.send(users);
});

module.exports = router;
