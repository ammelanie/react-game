/**
 * Created by melanie on 23/12/15.
 */

'use strict';

import EventEmitter from 'events';

import {GameConstants} from '../constants/GameConstants';

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

    /**
     * Permet de rechercher, parmi tous les chemins, les chemins à activer pour la ville donnée en paramètre
     * @param cityName      nom de la ville dont on cherche les chemins accessibles
     * @param paths         l'ensemble des chemins existants
     * @param cpt           compteur de récursivité
     * @returns {Array}     l'ensemble des chemisn à activer pour cette ville
     */
    searchPathsToActivate(cityName, paths, cpt = 0) {

        var pathsToActivate = [];

        cpt++;

        for ( let path of paths ) {

            // Si le chemin est concerné on devra l'activer
            if ( ( path.cityA === cityName || path.cityB === cityName ) && cpt <= GameConstants.NUMBER_OF_ALLOWED_ACTIONS) {

                pathsToActivate.push(path);

                // Determination de la ville qu'il faut par la suite analyser
                var cityToTest = ( path.cityA === cityName ) ? path.cityB : path.cityA;

                // Ajout des chemins trouvés pour la nouvelle ville
                pathsToActivate = pathsToActivate.concat(this.searchPathsToActivate(cityToTest, paths, cpt));
            }
        }

        return pathsToActivate;
    }


}

let _PathStore = new PathStore();
export default _PathStore;
