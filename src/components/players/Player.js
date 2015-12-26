/**
 * Created by melanie on 26/12/15.
 */

'use strict';

import React from 'react';

import CityStore from '../../stores/CityStore';
import PlayerStore from '../../stores/PlayerStore';

import GameActions from '../../actions/GameActions';

/**  Classe représentant un joueur du jeu */
class Player extends React.Component {

    /**
     * Callback appelé au clic sur une ville
     * Appelle une fonction permettant d'envoyer l'information de changement au Store adéquat
     * Le but étant de mettre à jour l'affichage des chemins de la carte
     */
    handleClick() {
        GameActions.togglePathsForCity(this.props.cityName);
        GameActions.activatePlayer(this.props.name);
    }

    /**
     * La vue correspond au joueur
     * @returns {ReactElement}
     */
    render() {

        var city = CityStore.findByName(this.props.cityName);

        var styles = {
            boxes: {
                boxShadow: this.props.selected ? "2px 2px 2px 1px " + this.props.color : "",
                position: "absolute",
                top: city.coordinateY + this.props.name.split(' ')[1]*20,
                left: city.coordinateX,
                backgroundColor: this.props.color,
                width: "15px",
                height: "15px"
            }
        };

        return (
            <div
                onClick={this.handleClick.bind(this)}
                style={styles.boxes}>
            </div>
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
 * @property {bool} selected                - Required          - permet de savoir si le joueur est selectionné
 */
Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    cityName: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired,
    selected: React.PropTypes.bool.isRequired
};