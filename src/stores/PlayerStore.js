/**
 * Created by melanie on 26/12/15.
 */

'use strict';

import EventEmitter from 'events';

import {GameConstants} from '../constants/GameConstants';

import GameDispatcher from '../dispatcher/GameDispatcher';

/**
 * Représente le store des joueurs
 */
class PlayerStore extends EventEmitter {

    /**
     * Construction du store avec l'ensemble des données de joueurs
     * @constructor
     */
    constructor(props) {
        super(props);
        this._players = [
            {
                name: "Joueur 1",
                color: "red"
            }, {
                name: "Joueur 2",
                color: "green"
            }, {
                name: "Joueur 3",
                color: "blue"
            }
        ];

        // Ajout de la ville initiale à chacun des joueurs et d'une propriété de selection
        for (let player of this._players) {
            player.cityName = "Toulouse";
            player.selected = false;
        }
    }

    /**
     * Récupère l'ensemble des joueurs
     * @returns {Array}
     */
    getAll() {
        return this._players;
    }

    /**
     * Retourne le joueur selectionné s'il existe
     * @returns {string/null}   retourne le joueur selectionné ou null
     */
    getSelectedPlayerName() {
        for (var player of this._players) {
            if (player.selected) {
                return player.name;
            }
        }
        return null;
    }

    /**
     * Active l'état de selection du joueur passé en paramètre et désactive les autres
     * @param name  nom du joueur
     */
    activatePlayer(name) {

        for (let player of this._players) {
            player.selected = (player.name === name);
        }
    }

    /**
     * Déplacement du joueur selectionné sur une ville cliquée
     * @param playerName  le nom du joueur qui doit se déplacer
     * @param cityName  le nom de la ville où le joueur doit se rendre
     */
    movePlayerToCity(cityName, playerName = this.getSelectedPlayerName()) {

        if (playerName === null)
            return;

        this.activatePlayer(playerName);

        console.info("Déplacement du joueur " + playerName + " vers la ville " + cityName);

        for (let player of this._players) {
            if (player.name === playerName) {
                player.cityName = cityName;
            }
        }
    }

    /**
     * Indique aux composants enregistrés qu'un changement a eu lieu au sein du store
     */
    emitChange() {
        this.emit(GameConstants.PLAYERS_CHANGE_EVENT);
    }

    /**
     * Enregistre un callback pour un composant qui sera déclenché lorsqu'un changement sera émi
     * @param callback  fonction à appeler lors de l'ajout du listener
     */
    addChangeListener(callback) {
        this.on(GameConstants.PLAYERS_CHANGE_EVENT, callback);
    }

    /**
     * Supprime le callback d'un composant pour ne plus recevoir les changements émis
     * @param callback  fonction à appeler lors de la suppression du listener
     */
    removeChangeListener(callback) {
        this.removeListener(GameConstants.PLAYERS_CHANGE_EVENT, callback);
    }
}

let _PlayerStore = new PlayerStore();
export default _PlayerStore;

/**
 * Enregistrement des actions à écouter en provenance du Dispatcher
 */
GameDispatcher.register((action) => {

    switch(action.type) {

        // Lorsque les joueurs doivent subir un changement d'état de selection
        case GameConstants.ACTIVATE_PLAYER:

            _PlayerStore.activatePlayer(action.playerName);
            _PlayerStore.emitChange();
            break;

        // Lorsque un joueur doit être déplacé
        case GameConstants.MOVE_PLAYER:
            _PlayerStore.movePlayerToCity(action.cityName, action.playerName);
            _PlayerStore.emitChange();
            break;

        default:
            break;
    }
});
