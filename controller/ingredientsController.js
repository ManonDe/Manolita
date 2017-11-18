'use strict';

/**
 * Récupération des schémas
 **/
 const ingredientsSchema = require('../model/ingredientsSchema');
 
 /**
  * Récupération des modules
  **/ 
  const express = require('express');
  const router = express.Router();
  
/*******************************************************************************
 *********************************Routes**************************************** 
 ******************************************************************************/ 
router.get('/', (req, res, next) => {   //récupère les ingrédients
  return ingredientsSchema.find()
  .then((allIngredients) => {
      return res.json(allIngredients);
  })
  .catch((error) => {
      console.log(error);
      res.send(error);
  });
});

router.post('/', (req, res, next) => {   //insère les ingrédients
  let ingredientSchema = new ingredientsSchema(req.body);
  return ingredientSchema.save()
  .then((oneIngredient) => {
    global.io.emit('new ingredients' , oneIngredient);
      return res.json(oneIngredient);
  })
  .catch((error) => {
      console.log(error);
      res.send(error);
  });
});

/*******************************************************************************
 ********************************Events*****************************************
 ******************************************************************************/ 
const ingredientEvent = (ServerEvent) => {
  ServerEvent.on('myEvent', (data, socket) => {
    console.log('This is myEvent call');
    ServerEvent.emit('myEventDone', data, socket);
  });
};

// Export
module.exports.ingredientEvent = ingredientEvent;
module.exports.router = router;