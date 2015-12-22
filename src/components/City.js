/**
 * Created by melanie on 21/12/15.
 */

import React from 'react';

import Path from './Path';
import CityStore from '../stores/CityStore';

/**  Classe représentant une ville */
class City extends React.Component {

    /**
     * La vue correspond à la ville souhaitée
     * @returns {ReactElement}
     */
    render() {

        var paths = [];

        // Parcours de l'ensemble des villes liées à notre capital afin de construire les chemins
        for (let key in this.props.linkedTo) {
            let capitalLinkedTo = this.props.linkedTo[key];

            let cityLinked = CityStore.findByName(capitalLinkedTo);

            paths.push(
                <Path
                    key={key}
                    x1={this.props.cx}
                    y1={this.props.cy}
                    x2={cityLinked.coordinateX}
                    y2={cityLinked.coordinateY}
                />
            );
        }

        return (
            <g>
                <circle
                    r={this.props.r}
                    cx={this.props.cx}
                    cy={this.props.cy}
                    stroke={this.props.stroke}
                    strokeWidth={this.props.strokeWidth}
                    fill={this.props.fill}
                />
                {paths}
            </g>
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
 * @property {array} linkedTo           - Required          - tableau des villes liées à la ville en cours de traitement
 */
City.propTypes = {
    r: React.PropTypes.number,
    cx: React.PropTypes.number.isRequired,
    cy: React.PropTypes.number.isRequired,
    stroke: React.PropTypes.string,
    strokeWidth: React.PropTypes.number,
    fill: React.PropTypes.string.isRequired,
    linkedTo: React.PropTypes.array.isRequired
};

/**
 * Définition de valeurs par défaut pour les propriétés non obligatoires
 */
City.defaultProps = {
    r: 5,
    stroke: "red",
    strokeWidth: 1
};