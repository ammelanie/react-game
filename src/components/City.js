/**
 * Created by melanie on 21/12/15.
 */

import React from 'react';

/**  Classe représentant une ville */
class City extends React.Component {

    /**
     * La vue correspond à la ville souhaitée
     * @returns {ReactElement}
     */
    render() {
        return (
            <circle r={this.props.r}
                    cx={this.props.cx}
                    cy={this.props.cy}
                    stroke={this.props.stroke}
                    strokeWidth={this.props.strokeWidth}
                    fill={this.props.fill}
            />
        );
    }
}

export default City;

/**
 * Vérification des propriétés de l'objet
 * @type {object}
 * @property {number} r                 - Default 5         - rayon du cercle
 * @property {number} cx                - Required          - coordonnée X du centre du cercle
 * @property {number} cy                - Required          - coordonnée Y du centre du cercle
 * @property {string} stroke            - Default red       - couleur de la ligne de délimitation de la ville
 * @property {number} strokeWidth       - Default 1         - épaisseur de la ligne de délimitation de la ville
 * @property {string} fill              - Required          - couleur de la ville : semblable à la région
 */
City.propTypes = {
    r: React.PropTypes.number,
    cx: React.PropTypes.number.isRequired,
    cy: React.PropTypes.number.isRequired,
    stroke: React.PropTypes.string,
    strokeWidth: React.PropTypes.number,
    fill: React.PropTypes.string.isRequired
};

/**
 * Définition de valeurs par défaut pour les propriétés non obligatoires
 */
City.defaultProps = {
    r: 5,
    stroke: "red",
    strokeWidth: 1
};