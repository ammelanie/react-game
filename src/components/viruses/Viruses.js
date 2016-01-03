/**
 * Created by melanie on 03/01/16.
 */

'use strict';

import React from 'react';

import Virus from './Virus';

import CityStore from '../../stores/CityStore';

/**  Classe représentant l'ensemble des virus du jeu */
class Viruses extends React.Component {

    /**
     * La vue correspond à un ensemble de virus
     * @returns {ReactElement}
     */
    render() {

        var viruses = [];
        var cities = CityStore.getAllInfectable();

        // Affichage des jauges de virus sur la carte
        for (let cityName in cities) {
            var city = cities[cityName];

            for (let virusName in city.viruses) {
                viruses.push(
                    <Virus
                        key={cityName + '-' + virusName}
                        name={virusName}
                        cityName={cityName}
                    />
                );
            }
        }


        return (
            <div>
                {viruses}
            </div>
        );
    }
}

export default Viruses;