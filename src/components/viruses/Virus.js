/**
 * Created by melanie on 03/01/16.
 */

'use strict';

import React from 'react';

import CityStore from '../../stores/CityStore';

import {GameConstants} from '../../constants/GameConstants';

/**  Classe représentant un virus */
class Virus extends React.Component {

    /**
     * La vue correspond au virus souhaité
     * @returns {ReactElement}
     */
    render() {

        var city = CityStore.findByName(this.props.cityName);

        var styles = {
            virus_boxes: {
                position: "absolute",
                top: city.coordinateY,
                left: ( this.props.name === GameConstants.VIRUS_A ) ? city.coordinateX + 30 : city.coordinateX + 40,
                width: "5px",
                height: "30px",
                border: "1px solid black"
            },
            virus: {
                position: "absolute",
                bottom: "0px",
                width: "5px",
                height: city.viruses[this.props.name].level * 10,
                backgroundColor: ( this.props.name === GameConstants.VIRUS_A ) ? "#FFEB3B" : "#4CAF50"
            }
        };

        return (
            <div style={styles.virus_boxes}>
                <div style={styles.virus}></div>
            </div>

        );
    }
}

export default Virus;

/**
 * Vérification des propriétés de l'objet
 * @type {object}
 * @property {string} name                  - Required          - nom du virus
 * @property {string} cityName              - Required          - nom de la ville où est le virus
 */
Virus.propTypes = {
    name: React.PropTypes.string.isRequired,
    cityName: React.PropTypes.string.isRequired
};