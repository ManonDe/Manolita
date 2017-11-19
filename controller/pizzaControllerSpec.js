'use strict';
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const url = 'https://pizza-project-manondep-1.c9users.io';

 //Récupération des schémas
 
const pizzaSchema = require('../model/pizza');


 //Récupération des modules
 
const express = require('express');
const router  = express.Router();
// const request = require('request');

//Test unitaire pour l'affichage de toutes les pizzas
describe('test affichage pizza', () => {
    it('affiche un tableau de pizzas', (done) => {
        chai.request(url).get('/pizza').end(function (err, res) {
            if (err) done(err);
            assert.typeOf(res, 'object');
            done()
        });
    });
})
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


 //Export
  
module.exports.pizzaEvent = pizzaEvent;
module.exports.router = router;