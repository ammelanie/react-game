/**
 * Created by melanie on 26/12/15.
 */

'use strict';

import React from 'react';

import PlayerStore from '../../stores/PlayerStore';

import Player from './Player';

/**  Classe représentant l'ensemble des joueurs du jeu */
class Players extends React.Component {

    /**
     * Constructeur de l'ensemble des joueurs
     * @param props
     */
    constructor(props) {
        super(props);

        // Ajout de chacun des joueurs en tant qu'état
        this.state = {players: PlayerStore.getAll()};
    }

    render() {

        var players = [];

        // Affichage des joueurs sur la carte
        for ( let key in this.state.players) {
            let player = this.state.players[key];

            players.push(
                <Player
                    key={key}
                    name={player.name}
                    cityName={player.cityName}
                    color={player.color}
                />
            );
        }

        return (
            <g>
                {players}
            </g>
        );
    }
}

export default Players;