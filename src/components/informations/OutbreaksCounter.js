/**
 * Created by melanie on 10/01/16.
 */

'user strict';

import React from 'react';

import {GameConstants} from '../../constants/GameConstants';

/**  Classe représentant le compteur d'éclosion */
class OutbreaksCounter extends React.Component {

    /**
     * La vue correspond au compteur d'éclosions
     * @returns {ReactElement}
     */
    render() {

        var outbreaks = [];

        for (let i = 1; i <= GameConstants.MAX_ECLOSIONS; i++) {

            // Clone de l'objet du style afin de pouvoir assigner des valeurs distinctes pour toutes les divs
            var outbreakBoxes = Object.assign({}, this.props.styles.boxes);
            outbreakBoxes['backgroundColor'] = "#ccc";

            // Si l'éclosion a déjà atteint ce nombre, passage en rouge
            if (this.props.outbreaksGot >= i) {
                outbreakBoxes['backgroundColor'] = "red";
            }

            outbreaks.push(
                <div key={"outbreak-" + i} style={outbreakBoxes}>
                    <div style={this.props.styles.text}>{i}</div>
                </div>
            );
        }

        return (
            <div>
                <h3>Éclosions</h3>
                <div>
                    {outbreaks}
                </div>
            </div>
        );
    }
}

export default OutbreaksCounter;

/**
 * Vérification des propriétés de l'objet
 * @type {object}
 * @property {number} outbreaksGot                - Required          - nombre d'éclosions ayant eu lieu
 * @property {oject} styles                       - Required          - style pour les badgets - doit contenir text et boxes
 */
OutbreaksCounter.propTypes = {
    outbreaksGot: React.PropTypes.number.isRequired,
    styles: React.PropTypes.object.isRequired
};