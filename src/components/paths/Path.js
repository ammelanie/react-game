/**
 * Created by melanie on 21/12/15.
 */

import React from 'react';

/**  Classe représentant un chemin entre deux villes */
class Path extends React.Component {

    /**
     * La vue correspond au chemin souhaité
     * @returns {ReactElement}
     */
    render() {

        // Mise en place du style particulier dans le cas où le chemin est activé
        if (this.props.active) {
            var stroke = "red";
        }

        return (
            <line
                x1={this.props.x1}
                y1={this.props.y1}
                x2={this.props.x2}
                y2={this.props.y2}
                stroke={stroke || this.props.stroke}
                strokeWidth={this.props.strokeWidth}
            />
        );
    }
}

export default Path;

/**
 * Vérification des propriétés de l'objet
 * @type {object}
 * @property {number} x1                    - Required          - coordonnée X du premier point
 * @property {number} y1                    - Required          - coordonnée Y du premier point
 * @property {number} x2                    - Required          - coordonnée X du deuxième point
 * @property {number} y2                    - Required          - coordonnée Y du deuxième point
 * @property {string} stroke                - Default #000000   - couleur de la ligne de délimitation du chemin
 * @property {number} strokeWidth           - Default 1         - épaisseur de la ligne de délimitation du chemin
 * @property {bool} active                  - Required          - état d'activation du chemin
 */
Path.propTypes = {
    x1: React.PropTypes.number.isRequired,
    y1: React.PropTypes.number.isRequired,
    x2: React.PropTypes.number.isRequired,
    y2: React.PropTypes.number.isRequired,
    stroke: React.PropTypes.string,
    strokeWidth: React.PropTypes.number,
    active: React.PropTypes.bool
};

/**
 * Définition de valeurs par défaut pour les propriétés non obligatoires
 */
Path.defaultProps = {
    stroke: "#000000",
    strokeWidth: 1
};