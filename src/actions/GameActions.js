/**
 * Created by melanie on 25/12/15.
 */

'use strict';

import GameDispatcher from '../dispatcher/GameDispatcher';
import {GameConstants} from '../constants/GameConstants';

export default {

    /**
     * Fonction permettant de changer l'état d'activation des chemins
     * Appelée lors d'un clic sur une ville
     * @param cityName  nom de la ville cliquée
     */
    togglePathsForCity(cityName) {

        GameDispatcher.dispatch({
            type: GameConstants.TOGGLE_PATHS,
            cityName: cityName
        });
    },

    /**
     * Activation d'un joueur qui vient d'être selectionné
     * @param name  nom du joueur
     */
    activatePlayer(name) {
        GameDispatcher.dispatch({
            type: GameConstants.ACTIVATE_PLAYER,
            playerName: name
        });
    }
}