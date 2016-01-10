/**
 * Created by melanie on 03/01/16.
 */

'use strict';

import React from 'react';

import Virus from './Virus';

import GameStore from '../../stores/GameStore';

import {GameConstants} from '../../constants/GameConstants';

/**  Classe représentant l'ensemble des virus du jeu */
class Viruses extends React.Component {

    /**
     * Constructeur de l'ensemble des virus
     * @param props
     */
    constructor(props) {
        super(props);

        // Ajout de chacune des villes infecatbles en tant qu'état
        this.state = {cities: GameStore.getAllInfectableCities()};

        this.onChange = this.onChange.bind(this);
    }

    /**
     * Callback appelé lorsque le store des villes émet un changement
     * Cela va mettre à jour l'état du composant et donc rafraichir les jauges de virus
     */
    onChange() {
        this.setState({ cities: GameStore.getAllInfectableCities() });
    }

    /**
     * Callback déclenché lorsque le composant est monté
     * Ajout d'un listener sur le store des villes
     */
    componentDidMount() {
        GameStore.addChangeListener(GameConstants.CITIES_CHANGE_EVENT, this.onChange);
    }

    /**
     * Callback déblenché lorsque le composant est démonté
     * Suppression d'un listener sur le store des villes
     */
    componentWillUnmount() {
        GameStore.removeChangeListener(GameConstants.CITIES_CHANGE_EVENT, this.onChange);
    }

    /**
     * La vue correspond à un ensemble de virus
     * @returns {ReactElement}
     */
    render() {

        var viruses = [];

        // Affichage des jauges de virus sur la carte
        for (let cityName in this.state.cities) {
            var city = this.state.cities[cityName];

            for (let virusName in city.viruses) {
                viruses.push(
                    <Virus
                        key={cityName + '-' + virusName}
                        name={virusName}
                        cityName={cityName}
                        color= {virusName === GameConstants.VIRUS_A  ? "#FFEB3B" : "#4CAF50"}
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