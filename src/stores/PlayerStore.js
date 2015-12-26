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

        // Ajout de la ville initiale à chacun des joueurs
        for (let player of this._players) {
            player.cityName = "Toulouse";
        }
    }

    getAll() {
        return this._players;
    }
}

let _PlayerStore = new PlayerStore();
export default _PlayerStore;