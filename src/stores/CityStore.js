/**
 * Created by melanie on 17/12/15.
 */

'use strict';

import EventEmitter from 'events';

/**
 * Représente le store des villes
 */
class CityStore extends EventEmitter {

    /**
     * Construction du store avec l'ensemble des données de villes
     * @constructor
     */
    constructor(props) {
        super(props);
        this._cities =
            {
                "Rennes": {
                    coordinateX: 120,
                    coordinateY: 160,
                    linkedTo: ["Rouen", "Nantes", "Paris"]
                },
                "Rouen": {
                    coordinateX: 240,
                    coordinateY: 90,
                    linkedTo: ["Rennes", "Lille"]
                },
                "Paris": {
                    coordinateX: 300,
                    coordinateY: 143,
                    linkedTo: ["Lille", "Rennes", "Strasbourg", "Orléans", "Dijon"]
                },
                "Lille": {
                    coordinateX: 328,
                    coordinateY: 25,
                    linkedTo: ["Rouen", "Paris", "Strasbourg"]
                },
                "Strasbourg": {
                    coordinateX: 515,
                    coordinateY: 150,
                    linkedTo: ["Paris", "Lille", "Dijon"]
                },
                "Lyon": {
                    coordinateX: 400,
                    coordinateY: 330,
                    linkedTo: ["Dijon", "Bordeaux", "Marseille"]
                },
                "Dijon": {
                    coordinateX: 390,
                    coordinateY: 230,
                    linkedTo: ["Lyon", "Paris", "Strasbourg"]
                },
                "Marseille": {
                    coordinateX: 400,
                    coordinateY: 480,
                    linkedTo: ["Ajaccio", "Toulouse", "Lyon"]
                },
                "Ajaccio": {
                    coordinateX: 495,
                    coordinateY: 550,
                    linkedTo: ["Marseille"]
                },
                "Toulouse": {
                    coordinateX: 220,
                    coordinateY: 450,
                    linkedTo: ["Marseille", "Bordeaux"]
                },
                "Bordeaux": {
                    coordinateX: 140,
                    coordinateY: 350,
                    linkedTo: ["Nantes", "Orléans", "Lyon", "Toulouse"]
                },
                "Orléans": {
                    coordinateX: 270,
                    coordinateY: 190,
                    linkedTo: ["Paris", "Bordeaux"]
                },
                "Nantes": {
                    coordinateX: 120,
                    coordinateY: 220,
                    linkedTo: ["Rennes", "Bordeaux"]
                }
        };
    }

    /**
     * Permet de récupérer l'ensemble des villes
     * @returns {Array}
     */
    getAll() {
        return this._cities;
    }

    /**
     * Permet de récupérer une ville par son nom
     * @param cityName - nom de la ville à rechercher
     * @returns {Object} - Ville retournée ou null
     */
    findByName(cityName) {
        return this._cities[cityName];
    }
}

let _CityStore = new CityStore();
export default _CityStore;
