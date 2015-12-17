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
                    coordinateY: 160
                },
                "Rouen": {
                    coordinateX: 240,
                    coordinateY: 90
                },
                "Paris": {
                    coordinateX: 300,
                    coordinateY: 143
                },
                "Lille": {
                    coordinateX: 328,
                    coordinateY: 25
                },
                "Strasbourg": {
                    coordinateX: 515,
                    coordinateY: 150
                },
                "Lyon": {
                    coordinateX: 400,
                    coordinateY: 330
                },
                "Dijon": {
                    coordinateX: 390,
                    coordinateY: 230
                },
                "Marseille": {
                    coordinateX: 400,
                    coordinateY: 480
                },
                "Ajaccio": {
                    coordinateX: 495,
                    coordinateY: 550
                },
                "Toulouse": {
                    coordinateX: 220,
                    coordinateY: 450
                },
                "Bordeaux": {
                    coordinateX: 140,
                    coordinateY: 350
                },
                "Orléans": {
                    coordinateX: 270,
                    coordinateY: 190
                },
                "Nantes": {
                    coordinateX: 120,
                    coordinateY: 220
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
