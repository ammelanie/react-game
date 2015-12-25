/**
 * Created by melanie on 23/12/15.
 */

'use strict';

import EventEmitter from 'events';

import {GameConstants} from '../constants/GameConstants';

import GameDispatcher from '../dispatcher/GameDispatcher';

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
            }];

        // Ajout de la propriété active à false par défaut pour chacun des chemins
        for (var path of this._paths) {
            path.active = false;
        }
    }

    /**
     * Permet de récupérer l'ensemble des chemins
     * @returns {Array}
     */
    getAll() {
        return this._paths;
    }

    /**
     * Permet de désactiver l'ensemble des chemins et de n'activer que les chemins ayant un lien avec la ville cliquée
     * Le lien s'établie à l'aide de la constante NUMBER_OF_ALLOWED_ACTIONS et vaut 2. Ainsi, tous les chemins à
     * une distance de 2 de la ville seront activés
     * @param cityName nom de la ville dont il faut activer/désactiver les chemins
     */
    togglePathsForCity(cityName) {

        // Recherche des chemins à activer
        var pathsToActivate = this.searchPathsToActivate(cityName, this._paths);

        // Mise à jour du store local avec les nouveaux chemins
        this._paths = this.activatePaths(pathsToActivate);
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

    /**
     * Permet d'activer les chemins passés en paramètre sur le carte. Tous les autres chemisn sont désactivés
     * @param pathsToActivate   tableau des chemins à activer
     * @returns {Array}         l'ensemble des chemins, de la carte, mis à jour
     */
    activatePaths(pathsToActivate) {

        var allPaths = this._paths;

        // Passage de l'ensemble des chemins à l'état désactiver
        for ( let path of allPaths ) {
            path.active = false;
        }

        // Activation des chemins à activer
        for ( let path of allPaths ) {

            for ( let activatePath of pathsToActivate ) {

                // Un chemin est à activer si sa ville de départ/arrivé correspond aux villes de départ/arrivé d'une
                // ville désignée comme devant être activée
                if ( ( activatePath.cityA === path.cityA || activatePath.cityA === path.cityB ) &&
                    ( activatePath.cityB === path.cityB || activatePath.cityB === path.cityA ) )  {
                    path.active = true;
                    break;
                }

            }
        }

        return allPaths;
    }

    /**
     * Indique aux composants enregistrés qu'un changement a eu lieu au sein du store
     */
    emitChange() {
        this.emit(GameDispatcher.PATHS_CHANGE_EVENT);
    }

    /**
     * Enregistre un callback pour un composant qui sera déclenché lorsqu'un changement sera émi
     * @param callback
     */
    addChangeListener(callback) {
        this.on(GameDispatcher.PATHS_CHANGE_EVENT, callback);
    }

    /**
     * Supprime le callback d'un composant pour ne plus recevoir les changements émis
     * @param callback
     */
    removeChangeListener(callback) {
        this.removeListener(GameDispatcher.PATHS_CHANGE_EVENT, callback);
    }
}

let _PathStore = new PathStore();
export default _PathStore;


GameDispatcher.register((action) => {

    switch(action.type) {

        // lorsque les employés ont été chargé depuis le serveur avec leurs affectations
        case GameConstants.TOGGLE_PATHS:

            _PathStore.togglePathsForCity(action.cityName);
            _PathStore.emitChange();
            break;

        default:
            break;
    }
});
