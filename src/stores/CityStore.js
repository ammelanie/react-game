/**
 * Created by melanie on 17/12/15.
 */

'use strict';

import EventEmitter from 'events';

import {GameConstants} from '../constants/GameConstants';

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
                    canBeInfected: true
                },
                "Rouen": {
                    coordinateX: 240,
                    coordinateY: 90,
                    canBeInfected: true
                },
                "Paris": {
                    coordinateX: 300,
                    coordinateY: 143,
                    canBeInfected: true
                },
                "Lille": {
                    coordinateX: 328,
                    coordinateY: 25,
                    canBeInfected: true
                },
                "Strasbourg": {
                    coordinateX: 515,
                    coordinateY: 150,
                    canBeInfected: true
                },
                "Lyon": {
                    coordinateX: 400,
                    coordinateY: 330,
                    canBeInfected: true
                },
                "Dijon": {
                    coordinateX: 390,
                    coordinateY: 230,
                    canBeInfected: true
                },
                "Marseille": {
                    coordinateX: 400,
                    coordinateY: 480,
                    canBeInfected: true
                },
                "Ajaccio": {
                    coordinateX: 495,
                    coordinateY: 550,
                    canBeInfected: true
                },
                "Toulouse": {
                    coordinateX: 220,
                    coordinateY: 450,
                    canBeInfected: true
                },
                "Bordeaux": {
                    coordinateX: 140,
                    coordinateY: 350,
                    canBeInfected: true
                },
                "Orléans": {
                    coordinateX: 270,
                    coordinateY: 190,
                    canBeInfected: true
                },
                "Nantes": {
                    coordinateX: 120,
                    coordinateY: 220,
                    canBeInfected: true
                }
        };

        // Ajout de la notion de virus pour les 13 principales villes, pouvant être infectés
        for (let key in this._cities) {
            var city = this._cities[key];

            if ( city.canBeInfected ) {
                city['viruses'] = {};
                city['viruses'][GameConstants.VIRUS_A] = {};
                city['viruses'][GameConstants.VIRUS_B] = {};
                city['viruses'][GameConstants.VIRUS_A]['level'] = 0;
                city['viruses'][GameConstants.VIRUS_B]['level'] = 0;
            }
        }
    }

    /**
     * Permet de récupérer l'ensemble des villes
     * @returns {Array}
     */
    getAll() {
        return this._cities;
    }

    /**
     * Permet de récupérer l'ensemble des villes pouvant être infectées
     * @returns {Object}
     */
    getAllInfectable() {

        var cities = {};

        for (let cityName in this._cities) {
            var city = this._cities[cityName];

            if (city.canBeInfected) {
                cities[cityName] = city;
            }
        }

        return cities;
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
