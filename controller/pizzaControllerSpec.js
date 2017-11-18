'use strict';

/**
 * Récupération des schémas
 **/
const pizzaSchema = require('../Model/pizzaSchema');

/**
 * Récupération des modules
 **/
const express = require('express');
const router  = express.Router();
// const request = require('request');


/*******************************************************************************
 **********************************Routes***************************************
 ******************************************************************************/ 

router.get('/', (req, res, next) => {
  res.json([]);
});

/*******************************************************************************
 ********************************Events***************************************** 
 ******************************************************************************/ 
const pizzaEvent = (ServerEvent) => {
  ServerEvent.on('myEvent', (data, socket) => {
    console.log('This is myEvent call');
    ServerEvent.emit('myEventDone', data, socket);
  });
};

/**
 * Export
 **/ 
module.exports.pizzaEvent = pizzaEvent;
module.exports.router = router;