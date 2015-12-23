/**
 * Created by melanie on 23/12/15.
 */

'use strict';

import EventEmitter from 'events';

/**
 * Représente le store des chemins
 */
class PathStore extends EventEmitter {

    /**
     * Construction du store avec l'ensemble des données de chemins
     * @constructor
     */
    constructor(props) {
        super(props);
        this._paths =
            [{
                cityA : "Rennes",
                cityB: "Rouen"
            }, {
                cityA: "Rennes",
                cityB : "Nantes"
            }, {
                cityA : "Rennes",
                cityB: "Paris"
            }, {
                cityA: "Rouen",
                cityB: "Lille"
            }, {
                cityA: "Paris",
                cityB: "Strasbourg"
            }, {
                cityA: "Paris",
                cityB: "Orléans"
            }, {
                cityA: "Paris",
                cityB: "Dijon"
            }, {
                cityA: "Paris",
                cityB: "Lille"
            }, {
                cityA: "Lille",
                cityB: "Strasbourg"
            }, {
                cityA: "Strasbourg",
                cityB: "Dijon"
            }, {
                cityA: "Lyon",
                cityB: "Dijon"
            }, {
                cityA: "Lyon",
                cityB: "Bordeaux"
            }, {
                cityA: "Lyon",
                cityB: "Marseille"
            }, {
                cityA: "Marseille",
                cityB: "Ajaccio"
            }, {
                cityA: "Marseille",
                cityB: "Toulouse"
            }, {
                cityA: "Toulouse",
                cityB: "Bordeaux"
            }, {
                cityA: "Bordeaux",
                cityB: "Nantes"
            }, {
                cityA: "Bordeaux",
                cityB: "Orléans"
            }]
    }

    /**
     * Permet de récupérer l'ensemble des chemins
     * @returns {Array}
     */
    getAll() {
        return this._paths;
    }

}

let _PathStore = new PathStore();
export default _PathStore;
