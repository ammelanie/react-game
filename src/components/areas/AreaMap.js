/**
 * Created by melanie on 30/11/15.
 */

'use strict';

import React from 'react';

/**  Classe représentant une ancienne région de France */
class AreaMap extends React.Component {

    /**
     * La vue correspond à la région souhaitée
     * @returns {ReactElement}
     */
    render() {
        return (
            <path
                d={this.props.d}
                stroke={this.props.stroke}
                strokeWidth={this.props.strokeWidth}
                strokeLinecap={this.props.strokeLinecap}
                strokeLinejoin={this.props.strokeLinejoin}
                strokeOpacity={this.props.strokeOpacity}
                fill={this.props.fill}
                fillOpacity={this.props.fillOpacity}>
            </path>
        );
    }
}

export default AreaMap;

/**
 * Vérification des propriétés de l'objet
 * @type {object}
 * @property {string} d                 - Required          - coordonnées/chemin de la région
 * @property {string} stroke            - Default #000000   - couleur de la ligne de délimitation de la région
 * @property {number} strokeWidth       - Default 1         - épaisseur de la ligne de délimitation de la région
 * @property {string} strokeLinecap     - Default "round"   - type de fin de ligne
 * @property {string} strokeLinejoin    - Default "round"   - type de jointure de lignes
 * @property {number} strokeOpacity     - Default 0.25      - opacité de la ligne de délimitation
 * @property {string} fill              - Required          - couleur par défaut de la région créée
 * @property {number} fillOpacity       - Default 1         - opacité de la couleur de la région
 * @property {string} name              - Required          - nom de la région
 */
AreaMap.propTypes = {
    d: React.PropTypes.string.isRequired,
    stroke: React.PropTypes.string,
    strokeWidth: React.PropTypes.number,
    strokeLinecap: React.PropTypes.string,
    strokeLinejoin: React.PropTypes.string,
    strokeOpacity: React.PropTypes.number,
    fill: React.PropTypes.string.isRequired,
    fillOpacity: React.PropTypes.number,
    name: React.PropTypes.string.isRequired
};

/**
 * Définition de valeurs par défaut pour les propriétés non obligatoires
 */
AreaMap.defaultProps = {
    stroke: "#000000",
    strokeWidth: 1,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeOpacity: 0.25,
    fillOpacity: 1
};