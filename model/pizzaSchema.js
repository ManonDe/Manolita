'use strict';
 /**
 * Schéma utilisateur
 * @module ArticleSchema
 */

/**
 * @requires Schema
 */
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Variables

// Schéma ArticleSchema
/**
 * @class PizzaSchema
 * @param {String} name - required: true
 * @param {String} desc - required: true
 * @param {String} text - required: true
 * @param {Date} update_at - required: true
 * @param {Date} register_date - required: true
 * @param {Array} comments - Liste des commentaires
 * @param {Object} type - Type de l'article
 * @param {String} picture - Lien vers l'image de couverture
 */
let PizzaSchema = mongoose.Schema({
    name              : { type: String, uniq: true, required: true },
    desc                : { type: String, required: true },
    picture             : { type: String, required: true },
    price               : { type: Number, required: true },
    update_at           : { type: Date },
    create_at           : { type: Date },
    comments            : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    first_frame_picture : { data: String, contentType: String }
});

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description WIP
 */
PizzaSchema.pre('validate', function(next) {
  next();
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant la MAJ
 */
PizzaSchema.pre('findOneAndUpdate', function(next) {
  // console.log('before this._update: ', this._update);
  if(this._update && this._update['$push'] && this._update['$push'].comments) {
    console.log('Do Nothing');
  }
  else {
    this._update.update_at = Date.now();
  }
  // console.log('after this._update: ', this._update);
  next();
});

/**
 * @function preSave
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant l'enregistrement
 */
PizzaSchema.pre('save', function(next) {
  this.update_at = Date.now();
  if (this.isNew) {
    this.register_date = this.update_at;
  }
  if (this.critical_info === false && this.hot_news === false) {
    this.hot_news = true;
  }
  next();
});

/**
 * @function findOneAndRemove
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Permet de supprimer la reference de l'article
 */
PizzaSchema.pre('findOneAndRemove', function(next) {
  mongoose.model('Comment').remove({'article_id': this._conditions._id}).exec();
  next();
});

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
PizzaSchema.post('save', function() {
  console.log('Pizza saved successfully!');
});


module.exports = mongoose.model('Pizza', PizzaSchema);