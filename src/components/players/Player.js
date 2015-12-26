/**
 * Created by melanie on 26/12/15.
 */

'use strict';

import React from 'react';

import CityStore from '../../stores/CityStore';
import PlayerStore from '../../stores/PlayerStore';

/**  Classe représentant un joueur du jeu */
class Player extends React.Component {

    /**
     * La vue correspond au joueur
     * @returns {ReactElement}
     */
    render() {

        var city = CityStore.findByName(this.props.cityName);

        return (
            <rect
                width="15"
                height="15"
                fill={this.props.color}
                x={city.coordinateX}
                y={city.coordinateY + (this.props.name.split(' ')[1]*15)}
            />
        );
    }

}

export default Player;

/**
 * Vérification des propriétés de l'objet
 * @type {object}
 * @property {string} name                  - Required          - nom du joueur
 * @property {string} cityName              - Required          - nom de la ville où est le joueur
 * @property {string} color                 - Required          - couleur du joueur
 */
Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    cityName: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired
};