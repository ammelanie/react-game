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

        this.onChange = this.onChange.bind(this);
    }

    /**
     * Callback appelé lorsque le store des joueurs émet un changement
     * Cela va mettre à jour l'état du composant et donc rafraichir l'ensemble des joueurs de la carte
     */
    onChange() {
        this.setState({ players: PlayerStore.getAll() });
    }

    /**
     * Callback déclenché lorsque le composant est monté
     * Ajout d'un listener sur le store
     */
    componentDidMount() {
        PlayerStore.addChangeListener(this.onChange);
    }

    /**
     * Callback déblenché lorsque le composant est démonté
     * Suppression d'un listener sur le store
     */
    componentWillUnmount() {
        PlayerStore.removeChangeListener(this.onChange);
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
                    selected={player.selected}
                />
            );
        }

        return (
            <div>
                {players}
            </div>
        );
    }
}

export default Players;