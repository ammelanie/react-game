/**
 * Created by melanie on 25/12/15.
 */

'use strict';

import GameDispatcher from '../dispatcher/GameDispatcher';
import {GameConstants} from '../constants/GameConstants';

export default {

    /**
     * Fonction permettant d'initialiser le jeu
     */
    initGame() {
        GameDispatcher.dispatch({
            type: GameConstants.INIT_GAME
        });
    },

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
    },

    /**
     * Déplacement d'un joueur vers une ville en particulier
     * @param playerName nom du joueur à déplacer
     * @param cityName  nom de la ville où le joueur doit aller
     */
    movePlayerToCity(cityName, playerName) {
        GameDispatcher.dispatch({
            type: GameConstants.MOVE_PLAYER,
            cityName: cityName,
            playerName: playerName
        });
        GameDispatcher.dispatch({
            type: GameConstants.VIRUS_PROPAGATION
        });
    },

    /**
     * Désactivation du virus passer en paramètre pour la ville courante
     * @param virusName nom du virus à soigner
     */
    cleanVirusForCurrentCity(virusName) {
        GameDispatcher.dispatch({
            type: GameConstants.VIRUS_CLEANING,
            virusName: virusName
        });
    },

    /**
     * Écoute du server de websocket
     */
    listenToWebSocketServer() {

        var socket = new WebSocket("ws://" + GameConstants.WEBSOCKET_SERVER_URL);
        var self = this;

        socket.onopen = function (event) {
            console.info("connected to websocket server");
        };

        // Réception d'un flux sous la forme "x/y/z" avec :
        // x : la ville de départ du joueur
        // y : la ville où va le joueur
        // z : le joueur
        socket.onmessage = function(message){

            console.info("new message received : " + message.data);

            var data = message.data.split('/');
            var newCityName = data[1];

            self.movePlayerToCity(newCityName, data[2]);
        };
    }
}