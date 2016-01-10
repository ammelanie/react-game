/**
 * Created by melanie on 10/01/16.
 */

'use strict';

import React from 'react';

import {GameConstants} from '../../constants/GameConstants';

/**  Classe représentant le compteur de propagation par tour : équivalent aux épidémies */
class EpidemicsCounter extends React.Component {

    /**
     * La vue correspond au compteur d'épidemies
     * @returns {ReactElement}
     */
    render() {

        var epidemics = [];

        // Le compteur est initiallement à 2
        epidemics.push(
            <div key={"epidemic-init"} style={Object.assign({backgroundColor: "green"}, this.props.styles.boxes)}>
                <div style={this.props.styles.text}>2</div>
            </div>
        );

        for (let i = 1; i <= GameConstants.EPIDEMIC_NUMBER; i++) {

            var text = 2;

            // Clone de l'objet du style afin de pouvoir assigner des valeurs distinctes pour toutes les divs
            var outbreakBoxes = Object.assign({}, this.props.styles.boxes);
            outbreakBoxes['backgroundColor'] = "#ccc";

            // Si le nombre d'épidémies a déjà atteint ce nombre, passage en vert
            if (this.props.epidemicsGot >= i) {
                outbreakBoxes['backgroundColor'] = "green";
            }

            // Définition du nombre de propagations par tour selon le nombre d'épidémies
            if (i >= 2 && i < 4) {
                text = 3;
            } else if (i >= 4) {
                text = 4;
            }

            epidemics.push(
                <div key={"epidemic-" + i} style={outbreakBoxes}>
                    <div style={this.props.styles.text}>{text}</div>
                </div>
            );
        }

        return (
            <div style={{clear: "both", marginTop: "90px"}}>
                <h3>Nombre de propagations par tour</h3>
                <div>
                    {epidemics}
                </div>
            </div>
        );
    }
}

export default EpidemicsCounter;

/**
 * Vérification des propriétés de l'objet
 * @type {object}
 * @property {number} epidemicsGot                  - Required          - nombre d'épidémies ayant déjà eu lieu
 * @property {oject} styles                         - Required          - style pour les badgets - doit contenir text et boxes
 */
EpidemicsCounter.propTypes = {
    epidemicsGot: React.PropTypes.number.isRequired,
    styles: React.PropTypes.object.isRequired
};