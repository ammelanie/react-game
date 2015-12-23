/**
 * Created by melanie on 21/12/15.
 */

import React from 'react';

import CityStore from '../stores/CityStore';

/**  Classe représentant une ville */
class City extends React.Component {

    /**
     * Callback appelé au clic sur une ville
     */
    handleClick() {
        this.props.toggleActivationPathFor(this.props.name);
    }

    /**
     * La vue correspond à la ville souhaitée
     * @returns {ReactElement}
     */
    render() {
        return (
            <g>
                <circle onClick={this.handleClick.bind(this)}
                    r={this.props.r}
                    cx={this.props.cx}
                    cy={this.props.cy}
                    stroke={this.props.stroke}
                    strokeWidth={this.props.strokeWidth}
                    fill={this.props.fill}
                />
            </g>
        );
    }
}

export default City;

/**
 * Vérification des propriétés de l'objet
 * @type {object}
 * @property {number} r                         - Default 5         - rayon du cercle
 * @property {number} cx                        - Required          - coordonnée X du centre du cercle
 * @property {number} cy                        - Required          - coordonnée Y du centre du cercle
 * @property {string} stroke                    - Default red       - couleur de la ligne de délimitation de la ville
 * @property {number} strokeWidth               - Default 1         - épaisseur de la ligne de délimitation de la ville
 * @property {string} fill                      - Required          - couleur de la ville : semblable à la région
 * @property {func} toggleActivationPathFor     - Required          - callback a appelé au clic d'une ville
 * @property {string} name                      - Required          - nom de la ville
 */
City.propTypes = {
    r: React.PropTypes.number,
    cx: React.PropTypes.number.isRequired,
    cy: React.PropTypes.number.isRequired,
    stroke: React.PropTypes.string,
    strokeWidth: React.PropTypes.number,
    fill: React.PropTypes.string.isRequired,
    toggleActivationPathFor: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired
};

/**
 * Définition de valeurs par défaut pour les propriétés non obligatoires
 */
City.defaultProps = {
    r: 5,
    stroke: "red",
    strokeWidth: 1
};