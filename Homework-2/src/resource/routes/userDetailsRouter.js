const express = require('express');
const Joi = require('joi');
const userDetailsRouter = express.Router();

const validateData = (data) => {
   const schema = Joi.object({
      firstName: Joi.string().regex(/[^0-9]/),
      lastName: Joi.string().regex(/[^0-9]/),
      date: Joi.date().min('1-2-1999'),
      gender: Joi.required(),
      email: Joi.string().email(),
      phoneNumber: Joi.string().regex(/[0-9]$/).min(10),
      subject: Joi.string(),
   });
   return schema.validate(data);
};

userDetailsRouter.post('/', (req, res) => {
   const { error } = validateData(req.body);
   if (error) return res.status(401).send(`<h1>${error.details[0].message}</h1>`);
   const {body} = req
   res.render('user', {layout: "main", body})
});
module.exports = userDetailsRouter;
